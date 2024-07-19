// lib/axiosConfig.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // URL de base pour les appels côté client
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiServer = axios.create({
    baseURL: process.env.API_BASE_URL, // URL de base pour les appels côté serveur
    headers: {
        'Content-Type': 'application/json',
    },
});

export { apiClient, apiServer };
