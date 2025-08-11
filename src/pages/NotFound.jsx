import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/pages/notFound.css'

export const NotFound = () => {
    return (
        <main className="not-found-page">
            <section className='not-found-content'>
                <h1>404</h1>
                <h2>Disculpa, la pagina no existe</h2>
                <p>El link que seguiste quizás no sea útil o la página fue removida.</p>
            </section>
            <section className='not-found-image'>
                <img src="/not/404.png" alt="Página no encontrada" />
            </section>
            <section className='not-found-actions'>
                <p>Vuelve a la <Link to={'/'} className='link-to-home'>página principal</Link> o utiliza el buscador.</p>
            </section>
        </main>
    )
}
