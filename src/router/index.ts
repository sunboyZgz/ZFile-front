import { createRouter, createWebHistory } from 'vue-router'
import { baseRoutes } from './routes/base'
// import { initialUser } from '/@/network/install'

const routes = baseRoutes
//import.meta.env.PROD ? import.meta.env.VITE_PUBLIC_PATH :
const router = createRouter({
	history: createWebHistory('/zfile'),
	routes,
})

router.beforeEach(async (to, from, next) => {
	/*if (to.path === '/install') {
		const { message } = await initialUser()
		if ((message as boolean) === true) {
			next('/login')
		} else {
			next()
		}
	} else {
		next()
	}*/
	next()
})

export default router
