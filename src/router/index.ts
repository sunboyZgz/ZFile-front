import { createRouter, createWebHistory } from 'vue-router'
import { baseRoutes } from './routes/base'
import { initialUser } from '/@/network/install'
import { isLogin } from '/@/network/base'
import { makeEndofSlash } from './_utils'
const routes = baseRoutes
const router = createRouter({
	history: createWebHistory('/zfile'),
	routes,
})

const whiteSet = new Set(['/main/'])
router.beforeEach(async (to, from, next) => {
	/*
	if (to.path === '/install') {
		//to the first redirect
		const { message } = await initialUser()
		if ((message as boolean) === true) {
			next('/login')
		} else {
			next()
		}
	} else {
		if (whiteSet.has(makeEndofSlash(to.path))) {
			const { message } = await isLogin()
			//here will be add some feature such as redirect to 403 page
			if ((message as boolean) === false) {
				next('/login')
			} else {
				next()
			}
		} else {
			next()
		}
	}
	*/
	next()
})

export default router
