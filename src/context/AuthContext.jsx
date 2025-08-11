import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../firebase/firebase'
import { db } from '../firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

const firebaseErrorFriendly = (code) => {
    switch (code) {
        case 'auth/email-already-in-use': return 'El correo ya está en uso.';
        case 'auth/invalid-email': return 'Correo inválido.';
        case 'auth/user-not-found': return 'Usuario no encontrado.';
        case 'auth/wrong-password': return 'Contraseña incorrecta.';
        case 'auth/weak-password': return 'La contraseña es muy débil (mínimo 6 caracteres).';
        case 'auth/popup-closed-by-user': return 'La ventana de autenticación fue cerrada.';
        case 'auth/cancelled-popup-request': return 'Solicitud cancelada.';
        case 'auth/invalid-credential': return 'Datos invalidos'
        default: return code || 'Ocurrió un error inesperado.';
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                const userDocRef = doc(db, "users", u.uid);
                const userSnap = await getDoc(userDocRef);

                let role = "user";
                if (userSnap.exists()) {
                    role = userSnap.data().role || "user";
                } else {
                    await setDoc(userDocRef, { email: u.email, role: "user" });
                }

                setUser({ ...u, role });
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const signup = async (email, password) => {
        try {
            setLoading(true);
            const res = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                email: res.user.email,
                role: "user"
            });

            await sendEmailVerification(res.user);
            setUser(res.user);
            return { user: res.user, message: "Revisa tu email para verificar la cuenta antes de iniciar sesión." };
        } catch (err) {
            return { error: firebaseErrorFriendly(err.code) };
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);
            const res = await signInWithEmailAndPassword(auth, email, password);

            if (!res.user.emailVerified) {
                await auth.signOut();
                return { error: 'Por favor, verifica tu email antes de iniciar sesión.' };
            }

            const userDocRef = doc(db, "users", res.user.uid);
            const userSnap = await getDoc(userDocRef);
            let role = "user";
            if (userSnap.exists()) {
                role = userSnap.data().role || "user";
            }

            setUser({ ...res.user, role });
            return { user: { ...res.user, role } };
        } catch (err) {
            return { error: firebaseErrorFriendly(err.code) };
        } finally {
            setLoading(false);
        }
    };



    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            return {};
        } catch (err) {
            return { error: firebaseErrorFriendly(err.code) };
        }
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            setLoading(true);
            const res = await signInWithPopup(auth, provider);

            const userDocRef = doc(db, "users", res.user.uid);
            let role = "user";
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                role = userDoc.data().role || "user";
            } else {
                await setDoc(userDocRef, { uid: res.user.uid, email: res.user.email, role: "user" });
            }

            setUser({ ...res.user, role });
            return { user: { ...res.user, role } };
        } catch (err) {
            return { error: firebaseErrorFriendly(err.code) };
        } finally {
            setLoading(false);
        }
    };



    const sendSignInLink = async (email) => {
        const actionCodeSettings = {
            url: window.location.origin + '/finishSignIn',
            handleCodeInApp: true,
        };
        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
            return { ok: true };
        } catch (err) {
            return { error: firebaseErrorFriendly(err.code) };
        }
    };

    const completeSignInWithEmailLink = async (url = window.location.href) => {
        try {
            if (isSignInWithEmailLink(auth, url)) {
                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) email = window.prompt('Por favor confirma tu email para continuar:');
                const res = await signInWithEmailLink(auth, email, url);
                window.localStorage.removeItem('emailForSignIn');
                setUser(res.user);
                return { user: res.user };
            } else {
                return { error: 'No es un enlace válido de inicio de sesión.' };
            }
        } catch (err) {
            return { error: firebaseErrorFriendly(err.code) };
        }
    };

    const value = {
        user,
        loading,
        signup,
        login,
        logout,
        loginWithGoogle,
        sendSignInLink,
        completeSignInWithEmailLink,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
