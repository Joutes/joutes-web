import axios from 'axios';
import { useDevApiLogStore } from '@/store/devApiLogStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Intercepteur pour injecter le token et mesurer le temps
api.interceptors.request.use((config) => {
    // On stocke le temps de début
    (config as any).metadata = { startTime: Date.now() };
    return config;
});

// Intercepteur pour gérer les logs de dev et le Refresh Token
api.interceptors.response.use(
    (response) => {
        if (import.meta.env.DEV) {
            const duration = Date.now() - (response.config as any).metadata.startTime;
            useDevApiLogStore.getState().addLog({
                method: response.config.method?.toUpperCase() || 'UNKNOWN',
                url: response.config.url || '',
                status: response.status,
                duration: duration
            });
        }
        return response;
    },
    async (error) => {
        if (import.meta.env.DEV && error.config) {
            const duration = Date.now() - (error.config as any).metadata.startTime;
            useDevApiLogStore.getState().addLog({
                method: error.config.method?.toUpperCase() || 'UNKNOWN',
                url: error.config.url || '',
                status: error.response?.status || 0,
                duration: duration,
                errorPayload: error.response?.data
            });
        }

        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
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