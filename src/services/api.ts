import axios, { type InternalAxiosRequestConfig } from 'axios';
import { useDevApiLogStore } from '@/store/devApiLogStore';

interface ApiRequestConfig extends InternalAxiosRequestConfig {
    metadata: {
        startTime: number;
    };
    _retry?: boolean;
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Intercepteur pour injecter le token et mesurer le temps
api.interceptors.request.use((config) => {
    // On stocke le temps de début
    (config as ApiRequestConfig).metadata = { startTime: Date.now() };
    return config;
});

// Intercepteur pour gérer les logs de dev et le Refresh Token
api.interceptors.response.use(
    (response) => {
        if (import.meta.env.DEV) {
            const config = response.config as ApiRequestConfig;
            const duration = Date.now() - config.metadata.startTime;
            useDevApiLogStore.getState().addLog({
                method: config.method?.toUpperCase() || 'UNKNOWN',
                url: config.url || '',
                status: response.status,
                duration: duration
            });
        }
        return response;
    },
    async (error) => {
        const config = error.config as ApiRequestConfig;

        if (import.meta.env.DEV && config) {
            const duration = Date.now() - config.metadata.startTime;
            useDevApiLogStore.getState().addLog({
                method: config.method?.toUpperCase() || 'UNKNOWN',
                url: config.url || '',
                status: error.response?.status || 0,
                duration: duration,
                errorPayload: error.response?.data
            });
        }

        const originalRequest = config;

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                const { data } = await axios.post('/auth/refresh', { token: refreshToken });

                localStorage.setItem('access_token', data.accessToken);

                // On rejoue la requête initiale avec le nouveau token
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Si le refresh échoue, on déconnecte
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;