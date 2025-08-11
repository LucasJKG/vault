import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import Admin from "../auth/Admin";
import ProductDetail from "../pages/ProductDetail";
import { PaymentMethods } from "../pages/Methods/PaymentMethods";
import { ShippingMethods } from "../pages/Methods/ShippingMethods";
import { ProductCare } from "../pages/ProductCare";
import { PolicyAndPrivacy } from "../pages/privacity/PolicyAndPrivacy";
import { TermsAndConditions } from "../pages/privacity/TermsAndConditions";
import { FAQ } from "../pages/FAQ";
import { Exchanges } from "../pages/Methods/Exchanges";
import Contact from "../pages/Contact";
import Search from "../pages/Search";
import { NotFound } from "../pages/NotFound";
import { Login } from "../auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import { Profile } from "../auth/Profile";
import { Account } from "../auth/Account";
import VerifyEmail from "../pages/VerifyEmail";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/busqueda/:query" element={<Search />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/admin" element={
                <ProtectedRoute>
                    <Admin />
                </ProtectedRoute>
            } />
            <Route path="/configuracion" element={
                <ProtectedRoute>
                    <Account />
                </ProtectedRoute>
            } />

            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/metodos-de-cambio" element={<Exchanges />} />
            <Route path="/metodos-de-pago" element={<PaymentMethods />} />
            <Route path="/metodos-de-envio" element={<ShippingMethods />} />
            <Route path="/cuidado-del-producto" element={<ProductCare />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/sobre-nosotros" element={<About />} />
            <Route path="/legal/politica-y-privacidad" element={<PolicyAndPrivacy />} />
            <Route path="/legal/terminos-y-condiciones" element={<TermsAndConditions />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/productos/:productId/:productName" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
