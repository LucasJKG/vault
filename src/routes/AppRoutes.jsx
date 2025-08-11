import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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
import { Account } from "../auth/Account";
import VerifyEmail from "../pages/VerifyEmail";

function RouteWithTitle({ title, children }) {
    useEffect(() => {
        document.title = title || "Vault";
    }, [title]);

    return children;
}

const routes = [
    { path: "/", element: <Home />, title: "Inicio - Vault" },
    { path: "/busqueda/:query", element: <Search />, title: "Búsqueda - Vault" },
    { path: "/productos", element: <Products />, title: "Productos - Vault" },
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <Admin />
            </ProtectedRoute>
        ),
        title: "Admin - Vault",
    },
    {
        path: "/configuracion",
        element: (
            <ProtectedRoute>
                <Account />
            </ProtectedRoute>
        ),
        title: "Configuración - Vault",
    },
    { path: "/verify-email", element: <VerifyEmail />, title: "Verificar Email - Vault" },
    { path: "/login", element: <Login />, title: "Login - Vault" },
    { path: "/metodos-de-cambio", element: <Exchanges />, title: "Métodos de Cambio - Vault" },
    { path: "/metodos-de-pago", element: <PaymentMethods />, title: "Métodos de Pago - Vault" },
    { path: "/metodos-de-envio", element: <ShippingMethods />, title: "Métodos de Envío - Vault" },
    { path: "/cuidado-del-producto", element: <ProductCare />, title: "Cuidado del Producto - Vault" },
    { path: "/contacto", element: <Contact />, title: "Contacto - Vault" },
    { path: "/sobre-nosotros", element: <About />, title: "Sobre Nosotros - Vault" },
    { path: "/legal/politica-y-privacidad", element: <PolicyAndPrivacy />, title: "Política y Privacidad - Vault" },
    { path: "/legal/terminos-y-condiciones", element: <TermsAndConditions />, title: "Términos y Condiciones - Vault" },
    { path: "/FAQ", element: <FAQ />, title: "Preguntas Frecuentes - Vault" },
    {
        path: "/productos/:productId/:productName",
        element: <ProductDetail />,
        title: "Detalle del Producto - Vault",
    },
];

export default function AppRoutes() {
    return (
        <Routes>
            {routes.map(({ path, element, title }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <RouteWithTitle title={title}>
                            {element}
                        </RouteWithTitle>
                    }
                />
            ))}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
