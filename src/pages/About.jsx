import { Link } from 'react-router-dom';
import '../styles/about.css';




export default function About() {
    return (
        <main className="vault-about">
            <header className="vault-header">
                <h1 className="vault-title">Sobre Vault</h1>
                <p className="vault-sub">Diseño, creación y venta gestionados con dedicación y cuidado artesanal.</p>
            </header>

            <section className="vault-card">
                <h2 className="vault-card__title">Quién está detrás</h2>
                <p className="vault-card__text">
                    Soy la única persona a cargo de la gestión de productos y de la venta: desde la idea hasta la entrega. Cada paso —diseño,
                    desarrollo de producto, fotografía, página web y marketing— lo llevo adelante personalmente para asegurar coherencia,
                    calidad y cercanía con quienes compran Vault.
                </p>
            </section>

            <section className="vault-card">
                <h2 className="vault-card__title">Mi historia</h2>
                <p className="vault-card__text">
                    Antes intenté lanzar otro proyecto bajo un nombre distinto, enfocado en zapatillas. Por motivos personales tuve que
                    dar un paso al costado y dejarlo. Hoy retomo el camino con Vault: una nueva etapa donde rediseño y reconstruyo todo
                    lo aprendido para crear una marca más sólida y alineada con mi visión.
                </p>
                <p className="vault-card__text">Gracias al apoyo de seres queridos pude formarme y terminar mis estudios —esas herramientas me permitieron
                    transformar la pasión en un emprendimiento tangible. A quienes me acompañaron, mi agradecimiento y compromiso.</p>
            </section>

            <section className="vault-card">
                <h2 className="vault-card__title">Visión y objetivos</h2>
                <ul className="vault-list">
                    <li>Crecer lo más rápido y sostenidamente posible, manteniendo la identidad artesanal y responsable del proyecto.</li>
                    <li>Expandir la marca más allá de la localidad: llegar a nuevas ciudades y mercados.</li>
                    <li>Ofrecer productos prolijos, profesionales y accesibles sin perder la cercanía humana que me caracteriza.</li>
                </ul>
            </section>

            <section className="vault-card">
                <h2 className="vault-card__title">El proceso y el esfuerzo</h2>
                <p className="vault-card__text">Ejecutar todo el proceso por mi cuenta implica horas de trabajo y decisiones constantes. Desde la confección de
                    prototipos hasta la optimización de la tienda online, busco que cada detalle sea profesional y accesible.</p>
                <p className="vault-card__text">Este esfuerzo se traduce en: atención personalizada, control de calidad, actualizaciones regulares y una comunicación
                    directa con clientes —porque creo que la confianza se construye en los detalles.</p>
            </section>

            <section className="vault-card">
                <h2 className="vault-card__title">¿Por qué elegir Vault?</h2>
                <p className="vault-card__text">Porque detrás de cada producto hay una sola persona comprometida en hacerlo bien: con estética pensada, materiales
                    cuidados y una experiencia de compra clara y honesta. Si valorás lo artesanal, lo pensado y lo personal, Vault está
                    hecho para vos.</p>
            </section>

            <footer className="vault-footer">
                <p className="vault-footer__text">¿Querés saber más o colaborar? <span className="vault-cta">Contactame</span> — estoy siempre abierto a ideas y oportunidades.</p>
                <Link to={'/contacto'} className="vault-btn">Ir a Contacto</Link>
            </footer>
        </main>
    );
}