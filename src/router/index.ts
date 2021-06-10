import { createRouter, createWebHistory } from 'vue-router'
import { baseRoutes } from './routes/base'

const routes = baseRoutes

export default createRouter({
	history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH || '/'),
	routes,
})
