import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/components/iconShare.css'

export const IconShare = () => {
    return (
        <section className="article-Icon-detail">
            <article className="icon-content-detail">
                <img src="/home-icon/envio.png" alt="Envio Icon Detail" />
                <span className="detail-icon">
                    <h3>Envíos gratis</h3>
                    <p>A partir de $100.000</p>
                    <Link to={'/metodos-de-envio'} className="show-more-detail">ver más</Link>
                </span>
            </article>
            <article className="icon-content-detail">
                <img src="/home-icon/tarjeta.png" alt="Payment Icon Detail" />
                <span className="detail-icon">
                    <h3>2 o 3 cuotas sin interés</h3>
                    <p>En toda la colección</p>
                    <Link to={'/metodos-de-pago'} className="show-more-detail">ver más </Link>
                </span>
            </article>
            <article className="icon-content-detail">
                <img src="/home-icon/cambio.png" alt="Cambio Icon Detail" />
                <span className="detail-icon">
                    <h3>¿Querés cambiarlo?</h3>
                    <p>Gratis hasta 14 días</p>
                    <Link to={'/metodos-de-cambio'} className="show-more-detail"> ver más</Link>
                </span>
            </article>
        </section>
    )
}
