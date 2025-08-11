import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth/verifyEmail.css';

export default function VerifyEmail() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user?.emailVerified) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    return (
        <main className='verify-content'>
            <h2>Verifica tu correo</h2>
            <p>
                Te hemos enviado un email de verificación. Por favor revisa tu bandeja de entrada y confirma tu cuenta antes de continuar.
            </p>
            <p>
                ⚠️ Si no ves el correo en tu bandeja de entrada, revisa la carpeta de spam o correo no deseado.
            </p>
        </main>
    );
}
