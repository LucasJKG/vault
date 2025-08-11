import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth/login.css';

export default function AuthForm() {
    const { user, login, signup, loginWithGoogle, logout } = useAuth();
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (mode === 'signup' && password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        try {
            let res;
            if (mode === 'login') {
                res = await login(email, password);
                if (res.error) setError(res.error);
            } else {
                res = await signup(email, password);
                if (res.error) setError(res.error);
                else setMessage(res.message || 'Cuenta creada correctamente. Puedes iniciar sesión.');
            }
        } finally {
            setLoading(false);
        }
    };

    const google = async () => {
        setError(null);
        setLoading(true);
        const res = await loginWithGoogle();
        if (res.error) setError(res.error);
        setLoading(false);
    };

    const toggleMode = () => {
        setError(null);
        setMessage(null);
        setMode(mode === 'login' ? 'signup' : 'login');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleLogout = async () => {
        setLoading(true);
        await logout();
        setLoading(false);
        navigate('/');
    };

    if (user) {
        return (
            <div className="auth-container">
                <h2>Bienvenido, {user.email}</h2>
                <p>¿Qué deseas hacer?</p>
                <div className="user-actions">
                    <Link to="/account" onClick={() => { }} className="btn">
                        Gestionar cuenta
                    </Link>
                    <button onClick={handleLogout} disabled={loading} className="btn logout-btn">
                        <p>
                            Cerrar sesión
                        </p>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <h2>{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
            <form onSubmit={submit}>
                <label>Email</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
                <label>Contraseña</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />
                {mode === 'signup' && (
                    <>
                        <label>Confirmar contraseña</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={loading}
                        />
                    </>
                )}
                {error && <p className="error">{error}</p>}
                {message && <p className="message">{message}</p>}
                <button type="submit" disabled={loading}>
                    <p>
                        {mode === 'login' ? 'Entrar' : 'Crear cuenta'}
                    </p>
                </button>
            </form>
            <span onClick={google} disabled={loading} className="google-btn">
                <img src="/google.png" alt="Google Icon Login" height={20} />
                <p >
                    Continuar con Google
                </p>
            </span>

            <button onClick={toggleMode} disabled={loading} className="toggle-btn">
                <p>
                    {mode === 'login' ? '¿No tienes cuenta? Crear una' : '¿Ya tienes cuenta? Iniciar sesión'}
                </p>
            </button>
        </div>
    );
}
