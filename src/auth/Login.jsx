import AuthForm from "../components/AuthForm";
import '../styles/auth/login.css'

export function Login() {
    return (
        <>
            <aside className="aside-login-layout">
                <section className="login-left-layout">
                    <article className="login-text-layout">
                        <section>
                            <h1>
                                Bienvenido a
                            </h1>
                            <img src="/vault.png" alt="Logo section login" />
                        </section>
                        <section>
                            <p>
                                Nos alegra tenerte aquí. Ingresa tus credenciales para acceder a tu cuenta y disfrutar de todas las funcionalidades de nuestra plataforma.
                            </p>
                        </section>
                    </article>
                </section>
                <section className="login-right-layout">
                    <AuthForm />
                </section>
            </aside>
        </>
    );
}
