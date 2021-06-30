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
		title: 'loginpage',
	},
}

const InstallRoute: RouteRecordRaw = {
	path: '/install',
	name: 'Install',
	component: () => import('/@/pages/Install.vue'),
	meta: {
		title: 'installpage',
	},
}

const MainRoute: RouteRecordRaw = {
	path: '/main',
	name: 'Main',
	component: () => import('/@/pages/Main.vue'),
	meta: {
		title: 'mainpage',
	},
}

export const baseRoutes = [RedirectRoute, LoginRoute, InstallRoute, MainRoute] as RouteRecordRaw[]
