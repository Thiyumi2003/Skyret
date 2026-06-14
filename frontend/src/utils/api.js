import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || "/api";

if (!import.meta.env.VITE_API_URL) {
    console.warn("VITE_API_URL is not set. Falling back to /api.");
}

const api = axios.create({
    baseURL,
})

api.interceptors.request.use((config) => {
    if (config.skipAuth) {
        if (config.headers) {
            delete config.headers.Authorization;
            delete config.headers.authorization;
        }
        return config;
    }

    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api;