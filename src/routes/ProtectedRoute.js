import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const ProtectedRoute = ({ children }) => {
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        const validate = async () => {
            try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/validate`, {
            method: 'GET',
                headers: {
                'authorization': token ? `Bearer ${token}` : '',
                },
            });
            setIsValid(response.ok);
            } catch (error) {
            setIsValid(false);
            }
        };
        validate();
    }, []);

    if (isValid === null) {
        return <div>Loading...</div>;
    }

    return isValid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;