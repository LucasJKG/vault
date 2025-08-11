import React, { useEffect, useState } from 'react'
import {
    updateProfile,
    updateEmail,
    deleteUser,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword
} from 'firebase/auth'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'
import '../styles/auth/account.css'
import { Loader } from '../components/Loader'


export const Account = () => {
    const user = auth.currentUser

    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null)
    const [newName, setNewName] = useState('')
    const [emailToUpdate, setEmailToUpdate] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [confirmingDelete, setConfirmingDelete] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const providerId = user?.providerData[0]?.providerId

    useEffect(() => {
        if (!user) {
            setLoading(false)
            return
        }
        const fetchUserData = async () => {
            try {
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setUserData(docSnap.data())
                }
            } catch (e) {
                setError(e.message)
            }
            setLoading(false)
        }
        fetchUserData()
    }, [user])

    if (loading) return <Loader />;
    if (!user) return <p>No estás autenticado.</p>

    const reauthenticate = async () => {
        if (!currentPassword) throw new Error('Ingresa tu contraseña actual para continuar')
        const credential = EmailAuthProvider.credential(user.email, currentPassword)
        await reauthenticateWithCredential(user, credential)
    }

    const handleUpdateName = async () => {
        try {
            await updateProfile(user, { displayName: newName })
            setUserData({ ...userData, displayName: newName })
            setNewName('')
            setError('')
            setSuccess('Nombre actualizado correctamente')
        } catch (e) {
            setError(e.message)
            setSuccess('')
        }
    }

    const handleUpdateEmail = async () => {
        try {
            await reauthenticate()
            await updateEmail(user, emailToUpdate)
            setError('')
            setSuccess('Email actualizado correctamente')
        } catch (e) {
            setError(e.message)
            setSuccess('')
        }
    }

    const handleUpdatePassword = async () => {
        try {
            await reauthenticate()
            await updatePassword(user, newPassword)
            setError('')
            setSuccess('Contraseña actualizada correctamente')
            setNewPassword('')
            setCurrentPassword('')
        } catch (e) {
            setError(e.message)
            setSuccess('')
        }
    }

    const handleDeleteAccount = async () => {
        try {
            await reauthenticate()
            await deleteDoc(doc(db, 'users', user.uid))
            await deleteUser(user)
        } catch (e) {
            setError(e.message)
            setSuccess('')
        }
    }

    return (
        <main className="account-container">
            <header>
                <h2 className="account-title">Perfil</h2>
            </header>

            <section aria-label="Información del usuario">
                <p className="account-info"><strong>Email:</strong> {user.email}</p>
                <p className="account-info"><strong>Nombre:</strong> {user.displayName || 'No establecido'}</p>
            </section>

            <div className='update-name'>
                <h3>Actualizar nombre</h3>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        handleUpdateName();
                    }}
                >
                    <input
                        type="text"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        placeholder="Nuevo nombre"
                        required
                    />
                    <button type="submit">Actualizar</button>
                </form>
            </div>


            {providerId === 'password' && (
                <>
                    <section className="account-section" aria-labelledby="update-email-title">
                        <h3 id="update-email-title" className="account-subtitle">Actualizar email</h3>
                        <form onSubmit={e => { e.preventDefault(); handleUpdateEmail(); }}>
                            <label htmlFor="email-update" className="visually-hidden">Nuevo email</label>
                            <input
                                id="email-update"
                                className="account-input"
                                type="email"
                                value={emailToUpdate}
                                onChange={e => setEmailToUpdate(e.target.value)}
                                placeholder="Nuevo email"
                                required
                            />
                            <label htmlFor="current-password-email" className="visually-hidden">Contraseña actual</label>
                            <input
                                id="current-password-email"
                                className="account-input"
                                type="password"
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                                placeholder="Contraseña actual (para confirmar)"
                                required
                            />
                            <button className="account-button" type="submit">Actualizar email</button>
                        </form>
                    </section>

                    <section className="account-section" aria-labelledby="update-password-title">
                        <h3 id="update-password-title" className="account-subtitle">Actualizar contraseña</h3>
                        <form onSubmit={e => { e.preventDefault(); handleUpdatePassword(); }}>
                            <label htmlFor="new-password" className="visually-hidden">Nueva contraseña</label>
                            <input
                                id="new-password"
                                className="account-input"
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                placeholder="Nueva contraseña"
                                required
                            />
                            <label htmlFor="current-password-password" className="visually-hidden">Contraseña actual</label>
                            <input
                                id="current-password-password"
                                className="account-input"
                                type="password"
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                                placeholder="Contraseña actual (para confirmar)"
                                required
                            />
                            <button className="account-button" type="submit">Actualizar contraseña</button>
                        </form>
                    </section>
                </>
            )}

            {providerId === 'google.com' && (
                <section className="account-message" aria-live="polite">
                    <p>No puedes cambiar email ni contraseña en cuentas de Google desde aquí.</p>
                </section>
            )}

            <section className="account-section" aria-labelledby="delete-account-title">
                <h3 id="delete-account-title" className="account-subtitle">Eliminar cuenta</h3>
                {confirmingDelete ? (
                    <>
                        <p className="account-warning">¿Estás seguro? Esta acción es irreversible.</p>
                        {providerId === 'password' && (
                            <>
                                <label htmlFor="current-password-delete" className="visually-hidden">Contraseña actual</label>
                                <input
                                    id="current-password-delete"
                                    className="account-input"
                                    type="password"
                                    value={currentPassword}
                                    onChange={e => setCurrentPassword(e.target.value)}
                                    placeholder="Contraseña actual (para confirmar)"
                                    required
                                />
                            </>
                        )}
                        <button className="account-button danger" onClick={handleDeleteAccount}>Sí, eliminar cuenta</button>
                        <button className="account-button" onClick={() => { setConfirmingDelete(false); setError(''); setSuccess('') }}>
                            Cancelar
                        </button>
                    </>
                ) : (
                    <button className="account-button danger" onClick={() => setConfirmingDelete(true)}>
                        Eliminar cuenta
                    </button>
                )}
            </section>

            {error && <p className="account-error" role="alert">{error}</p>}
            {success && <p className="account-success" role="status">{success}</p>}
        </main>
    )

}
