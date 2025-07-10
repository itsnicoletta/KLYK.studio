import axios from 'axios'

export const strapi = axios.create({
    baseURL: import.meta.env.VITE_STRAPI_URL,
    headers: { 'Content-Type': 'application/json' }
})