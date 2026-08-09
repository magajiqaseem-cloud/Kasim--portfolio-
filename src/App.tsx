import { NavProvider, useNav } from './context/nav'
import Nav from './sections/Nav'
import Footer from './sections/Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import StorePage from './pages/StorePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function Pages() {
  const { page } = useNav()
  return (
    <>
      <Nav />
      {page === 'home' && <HomePage />}
      {page === 'services' && <ServicesPage />}
      {page === 'portfolio' && <PortfolioPage />}
      {page === 'store' && <StorePage />}
      {page === 'about' && <AboutPage />}
      {page === 'contact' && <ContactPage />}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <NavProvider>
      <Pages />
    </NavProvider>
  )
}
