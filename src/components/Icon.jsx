import {
  Award,
  ChevronDown,
  CloudSun,
  CodeXml,
  Contact,
  Database,
  ExternalLink,
  FolderCode,
  GraduationCap,
  Home,
  Languages,
  Mail,
  Moon,
  Presentation,
  Route,
  Server,
  ShieldCheck,
  Smartphone,
  Sun,
  X,
} from 'lucide-react'

const icons = {
  award: Award,
  chevron: ChevronDown,
  cloud: CloudSun,
  code: CodeXml,
  contact: Contact,
  database: Database,
  external: ExternalLink,
  folder: FolderCode,
  github: CodeXml,
  graduation: GraduationCap,
  home: Home,
  languages: Languages,
  linkedin: Contact,
  mail: Mail,
  moon: Moon,
  presentation: Presentation,
  route: Route,
  server: Server,
  shield: ShieldCheck,
  smartphone: Smartphone,
  sun: Sun,
  x: X,
}

export function Icon({ name, size = 20, ...props }) {
  const Component = icons[name] ?? CodeXml
  return <Component aria-hidden="true" size={size} strokeWidth={1.8} {...props} />
}
