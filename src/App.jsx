import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useTheme } from './hooks/useTheme'
import { CertificatesPage } from './pages/CertificatesPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { TimelinePage } from './pages/TimelinePage'
import { pageFromPath } from './routes'
import './styles/index.css'

const pages = {
  inicio: HomePage,
  trayectoria: TimelinePage,
  proyectos: ProjectsPage,
  certificados: CertificatesPage,
  contacto: ContactPage,
}

export default function App({ pathname = '/' }) {
  const theme = useTheme()
  const currentPage = pageFromPath(pathname)
  const Page = pages[currentPage]

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header currentPage={currentPage} onThemeToggle={theme.toggle} />
      <main className={`page page-${currentPage}`} id="contenido">
        <Page />
      </main>
      <Footer />
    </>
  )
}
