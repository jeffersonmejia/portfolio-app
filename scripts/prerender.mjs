import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { render, routeDefinitions, siteUrl } from '../dist-server/entry-server.js'

const projectPath = dirname(dirname(fileURLToPath(import.meta.url)))
const distPath = join(projectPath, 'dist')
const indexPath = join(distPath, 'index.html')
const serverPath = join(projectPath, 'dist-server')
const template = await readFile(indexPath, 'utf8')
const marker = '<div id="root"></div>'

if (!template.includes(marker)) {
  throw new Error('No se encontró el contenedor principal para prerenderizar.')
}

function replaceMeta(html, attribute, key, value) {
  const pattern = new RegExp(`<meta ${attribute}="${key}" content="[^"]*" \\/>`)
  return html.replace(pattern, `<meta ${attribute}="${key}" content="${value}" />`)
}

function createHtml(route) {
  const canonical = `${siteUrl}${route.path}`
  let html = template.replace(marker, `<div id="root">${render(route.path)}</div>`)
  html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
  html = replaceMeta(html, 'name', 'description', route.description)
  html = replaceMeta(html, 'property', 'og:title', route.title)
  html = replaceMeta(html, 'property', 'og:description', route.description)
  html = replaceMeta(html, 'property', 'og:url', canonical)
  html = replaceMeta(html, 'name', 'twitter:title', route.title)
  html = replaceMeta(html, 'name', 'twitter:description', route.description)
  return html
}

for (const route of routeDefinitions) {
  const segment = route.path.replace(/^\/|\/$/g, '')
  const output = segment ? join(distPath, segment, 'index.html') : indexPath
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, createHtml(route))
}

await cp(indexPath, join(distPath, '404.html'))
await rm(serverPath, { recursive: true, force: true })
console.log(`${routeDefinitions.length} páginas prerenderizadas y página 404 generada.`)
