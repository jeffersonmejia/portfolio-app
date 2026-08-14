import {
  SiApache,
  SiCss,
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMysql,
  SiPhp,
  SiPostgresql,
  SiPython,
} from 'react-icons/si'
import { Icon } from './Icon'

const technologies = {
  Apache: { component: SiApache, color: '#d22128' },
  CSS: { component: SiCss, color: '#663399' },
  Docker: { component: SiDocker, color: '#2496ed' },
  Firebase: { component: SiFirebase, color: '#e66000' },
  Flutter: { component: SiFlutter, color: '#02569b' },
  HTML: { component: SiHtml5, color: '#e34f26' },
  JavaScript: { component: SiJavascript, color: '#b28a00' },
  Linux: { component: SiLinux, color: '#9a7600' },
  MySQL: { component: SiMysql, color: '#4479a1' },
  PHP: { component: SiPhp, color: '#777bb4' },
  PostgreSQL: { component: SiPostgresql, color: '#4169e1' },
  Python: { component: SiPython, color: '#3776ab' },
}

const fallbacks = {
  API: { icon: 'code', color: '#0067a8' },
  Backend: { icon: 'server', color: '#0067a8' },
  CVSS: { icon: 'shield', color: '#0b6074' },
  Samba: { icon: 'server', color: '#0b6074' },
}

export function TechnologyIcon({ name }) {
  const technology = technologies[name]
  const fallback = fallbacks[name] ?? { icon: 'code', color: '#0067a8' }
  const Component = technology?.component
  const color = technology?.color ?? fallback.color

  return (
    <span className="technology-tag" style={{ '--technology-color': color }}>
      <span className="technology-icon-shell" aria-hidden="true">
        {Component ? <Component className="technology-icon" /> : <Icon className="technology-icon" name={fallback.icon} size={15} />}
      </span>
      {name}
    </span>
  )
}
