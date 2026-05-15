import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Intercepteur pour injecter le token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("bearer_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Intercepteur pour gérer le Refresh Token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
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
                // @TODO: Remove clearing of refresh.
                //localStorage.clear();
                //window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;