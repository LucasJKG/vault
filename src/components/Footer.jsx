import React from 'react'
import '../styles/components/footer.css'
import { Link } from 'react-router-dom';

export const Footer = () => {

  const phoneNumber = '+19832049808';
  const message = 'Hola, quiero más información!';

  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <footer className="footer">
      <aside className="footer-content">
        <section className="footer-left">
          <picture className="footer-logo">
            <img src="/vault.png" alt="Footer Logo" />
          </picture>
          <article className="footer-description">
            <p>
              El calzado que te da seguridad y estilo.
            </p>
            <p>
              Whatsapp: +1 (983) 204-9808
            </p>
          </article>
          <article className='footer-icons'>
            <a href="https://www.instagram.com/vault.vm/" target="_blank" rel="noopener noreferrer">
              <picture className="contact-icon-footer">
                <img src="/social-icon/ig.png" alt="Instagram Icon Footer" />
              </picture>
            </a>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <picture className="contact-icon-footer">
                <img src="/social-icon/whatsapp.png" alt="Whatsapp Icon Footer" />
              </picture>
            </a>
          </article>

        </section>
        <section className="footer-center">
          <h3>INFO</h3>
          <ul className="footer-links">
            <li><Link to={'/metodos-de-cambio'} href="/">Cambios y devoluciones</Link ></li>
            <li><Link to={'/metodos-de-pago'} href="/nosotros">Formas de pago</Link ></li>
            <li><Link to={'/metodos-de-envio'} href="/contacto">Método de envío</Link ></li>
            <li><Link to={'/cuidado-del-producto'} href="/contacto">Cuidado del producto</Link ></li>
            <li><Link to={'/contacto'} href="/contacto">Local</Link ></li>
            <li><Link to={'/sobre-nosotros'} href="/contacto">Nosotros</Link ></li>
          </ul>
        </section>
        <section className="footer-right">
          <h3>MÁS</h3>
          <ul className="footer-links">
            <li><Link to={'/legal/politica-y-privacidad'} href="/productos">Politicas de privacidad</Link ></li>
            <li><Link to={'/legal/terminos-y-condiciones'} href="/productos">Términos y condiciones</Link ></li>
            <li><Link to={'/FAQ'} href="/productos">Preguntas frecuentes</Link ></li>
            <li><Link to={'/contacto'} href="/contacto">Contacto</Link ></li>
          </ul>
        </section>
      </aside>

      <section className="footer-bottom">
        <p>by <strong>Vault Store</strong> since 2025.</p>
        <p></p>
      </section>
    </footer>

  )
}
