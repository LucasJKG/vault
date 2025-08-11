import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from './Loader';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <Loader />;
    if (!user) return <Navigate to="/login" replace />;
    if (!user.emailVerified) return <Navigate to="/verify-email" replace />;

    return children;
}
