import { useEffect, useState } from "react";
import api from "../utils/api";
import { IUser } from "../types";

const useAuth = () => {
    const [user, setUser] = useState<IUser | null>(null);

    const fetchUser = async () => {
        const token = localStorage.getItem('authToken');
        const username = localStorage.getItem('username');
        if (token && username) {
            try {
                const response = await api.get('/users', { headers: { Authorization: `Bearer ${token}` } });
                const loggedInUser = response.data.find((u: IUser) => u.username === username);
                setUser(loggedInUser);
            } catch (error) {
                console.error('Error fetching user:', error);
                localStorage.removeItem('authToken');
                localStorage.removeItem('username');
            }
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const response = await api.post('/login', { username, password });
            if (response.status === 401 || response.status === 500) {
                throw new Error('Authentication failed'); // Puedes personalizar este mensaje
            }

            const token = response.data.token;
            localStorage.setItem('authToken', token);
            localStorage.setItem('username', username);

            // Obtener los detalles del usuario autenticado
            await fetchUser();
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        setUser(null);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return [user, login, logout] as const;
};

export default useAuth;
