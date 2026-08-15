import {
  SiApache,
  SiCss,
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMysql,
  SiOpenjdk,
  SiOllama,
  SiPaypal,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSharp,
  SiSpringboot,
  SiTypescript,
  SiJsonwebtokens,
} from 'react-icons/si'
import { Icon } from './Icon'

const technologies = {
  Apache: { component: SiApache, color: '#d22128' },
  CSS: { component: SiCss, color: '#663399' },
  'C#': { component: SiSharp, color: '#512bd4', darkColor: '#b69cff' },
  Docker: { component: SiDocker, color: '#2496ed' },
  'Docker Swarm': { component: SiDocker, color: '#2496ed' },
  Firebase: { component: SiFirebase, color: '#e66000' },
  Flutter: { component: SiFlutter, color: '#02569b' },
  Git: { component: SiGit, color: '#f05032' },
  GitHub: { component: SiGithub, color: '#57606a', darkColor: '#f0f6fc' },
  HTML: { component: SiHtml5, color: '#e34f26' },
  JavaScript: { component: SiJavascript, color: '#b28a00' },
  Java: { component: SiOpenjdk, color: '#e76f00' },
  JWT: { component: SiJsonwebtokens, color: '#6f42c1' },
  Linux: { component: SiLinux, color: '#9a7600' },
  MySQL: { component: SiMysql, color: '#4479a1' },
  Ollama: { component: SiOllama, color: '#6553a3' },
  PayPal: { component: SiPaypal, color: '#0070ba' },
  PHP: { component: SiPhp, color: '#777bb4' },
  PostgreSQL: { component: SiPostgresql, color: '#4169e1' },
  Python: { component: SiPython, color: '#3776ab' },
  React: { component: SiReact, color: '#087ea4', darkColor: '#61dafb' },
  'Spring Boot': { component: SiSpringboot, color: '#6db33f' },
  TypeScript: { component: SiTypescript, color: '#3178c6' },
}

const fallbacks = {
  API: { icon: 'code', color: '#0067a8' },
  'ASP.NET Core': { icon: 'server', color: '#512bd4', darkColor: '#b69cff' },
  Backend: { icon: 'server', color: '#0067a8' },
  'Arquitectura hexagonal': { icon: 'route', color: '#6553a3' },
  CVSS: { icon: 'shield', color: '#0b6074' },
  MFA: { icon: 'shield', color: '#0b6074' },
  OAuth: { icon: 'shield', color: '#6553a3' },
  REST: { icon: 'code', color: '#0067a8' },
  SQL: { icon: 'database', color: '#4169e1' },
  Samba: { icon: 'server', color: '#0b6074' },
}

export function TechnologyIcon({ name }) {
  const technology = technologies[name]
  const fallback = fallbacks[name] ?? { icon: 'code', color: '#0067a8' }
  const Component = technology?.component
  const color = technology?.color ?? fallback.color
  const darkColor = technology?.darkColor ?? fallback.darkColor ?? color

  return (
    <span className="technology-tag" style={{ '--technology-color': color, '--technology-dark-color': darkColor }}>
      <span className="technology-icon-shell" aria-hidden="true">
        {Component ? <Component className="technology-icon" /> : <Icon className="technology-icon" name={fallback.icon} size={15} />}
      </span>
      {name}
    </span>
  )
}
