import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const roots = ['src', 'scripts']
const extensions = new Set(['.css', '.js', '.jsx', '.mjs'])
const limit = 200
const failures = []

async function inspect(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  for (const entry of entries) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) await inspect(path)
    if (!entry.isFile() || !extensions.has(extname(path))) continue
    const content = await readFile(path, 'utf8')
    const lines = content.split(/\r?\n/).length
    if (lines > limit) failures.push(`${relative('.', path)}: ${lines} líneas`)
  }
}

for (const root of roots) await inspect(root)

if (failures.length) {
  console.error(`Archivos con más de ${limit} líneas:\n${failures.join('\n')}`)
  process.exit(1)
}

console.log(`Todos los archivos de código respetan el límite de ${limit} líneas.`)
