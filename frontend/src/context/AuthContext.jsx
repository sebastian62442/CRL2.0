// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [username, setUsername] = useState("");  // Store username
    const [loading, setLoading] = useState(true);  // Indicates if the auth data is still loading
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const storedUsername = localStorage.getItem('username');  // Get username from localStorage

        if (token && role) {
            setIsAuthenticated(true);
            setUserRole(role);
            setUsername(storedUsername);  // Set the username in state

            setUser({ token }); // Simplified, you might want to store more user details
        }
        setLoading(false);  // Set loading to false after checking local storage
    }, []);

    const login = (token, role, username) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('username', username);  // Store username in localStorage
        setIsAuthenticated(true);
        setUserRole(role);
        setUsername(username);  // Update username in state
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');  // Remove username from localStorage

        setIsAuthenticated(false);
        setUserRole(null);
        setUsername("");  // Clear username in state

    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, username, login, logout, loading }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
