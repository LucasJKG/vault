import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import { WhatsAppButton } from './components/WhatsAppButton'
import { Footer } from './components/Footer'
import { ProductProvider } from './context/ProductContext'
import ScrollToTop from './components/ScrollToTop'
import { IconShare } from './components/IconShare'
import Breadcrumb from './components/Breadcrumb'
import { AuthProvider } from './context/AuthContext'

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <ScrollToTop />
      <WhatsAppButton />
      <Navbar />
      {!isHome && <Breadcrumb />}
      <AppRoutes />
      <IconShare />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <AuthProvider>  
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ProductProvider>
  );
}
