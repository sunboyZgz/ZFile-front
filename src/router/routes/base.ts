import { RouteRecordRaw } from 'vue-router'
import { REDIRECT_NAME } from '../constants'
const RedirectRoute: RouteRecordRaw = {
	path: '/',
	name: REDIRECT_NAME,
	redirect: '/main',
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
	path: '/main/:path*',
	name: 'Main',
	component: () => import('/@/pages/Main.vue'),
	meta: {
		title: 'mainpage',
	},
}

const SystemRoute: RouteRecordRaw = {
	path: '/system',
	name: 'System',
	component: () => import('/@/pages/System.vue'),
	meta: {
		title: 'systempage',
	},
}

export const baseRoutes = [
	RedirectRoute,
	LoginRoute,
	InstallRoute,
	MainRoute,
	SystemRoute,
] as RouteRecordRaw[]
