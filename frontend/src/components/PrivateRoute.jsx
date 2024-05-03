import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children, role }) {
    const { isAuthenticated, userRole, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // Handle loading state appropriately
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && userRole !== role) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default PrivateRoute;
