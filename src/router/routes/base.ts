import { RouteRecordRaw } from 'vue-router'
import { REDIRECT_NAME } from '../constants'
const RedirectRoute: RouteRecordRaw = {
	path: '/',
	name: REDIRECT_NAME,
	redirect: '/login',
	meta: {
		title: REDIRECT_NAME,
	},
}

const LoginRoute: RouteRecordRaw = {
	path: '/login',
	name: 'Login',
	component: () => import('/@/pages/Login.vue'),
	meta: {
		title: 'pageTitle',
	},
}

const TestRoute: RouteRecordRaw = {
	path: '/test',
	name: 'Test',
	component: () => import('/@/pages/Login.vue'),
	meta: {
		title: 'test',
	},
}

export const baseRoutes = [
	RedirectRoute,
	LoginRoute,
	TestRoute,
] as RouteRecordRaw[]
