import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Passwordless() {
    const { sendSignInLink, completeSignInWithEmailLink } = useAuth();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            const res = await completeSignInWithEmailLink(window.location.href);
            if (res?.error) setError(res.error);
            if (res?.user) setMessage('Inicio de sesión completado.');
        })();
    }, []);

    const send = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        const res = await sendSignInLink(email);
        if (res.error) setError(res.error);
        else setMessage('Revisa tu correo para el enlace de inicio de sesión.');
    };

    return (
        <div className="auth-container">
            <h3>Inicio sin contraseña (Email link)</h3>
            <form onSubmit={send}>
                <input
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Enviar enlace</button>
            </form>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
}
