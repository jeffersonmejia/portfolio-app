import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PageSkeleton } from './components/PageSkeleton'
import { useTheme } from './hooks/useTheme'
import { CertificatesPage } from './pages/CertificatesPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { pageFromPath } from './routes'
import './styles/index.css'

const pages = {
  inicio: HomePage,
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
      <PageSkeleton />
      <main className={`page page-${currentPage}`} id="contenido">
        <Page />
      </main>
      <Footer />
    </>
  )
}
