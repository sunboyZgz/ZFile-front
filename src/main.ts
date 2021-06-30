import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
// import '/@/style/base.scss'
import { setupI18n } from './i18n/'
import { setupUI } from './setupUI'
import { setupWindow } from '/@/utils/env'
import vueStore from './store/'
import router from './router/'

// console.log(import.meta.env)

async function setup() {
	setupWindow()
	const app = createApp(App)
	setupI18n(app)
	app.use(router)
	setupUI(app)
	app.use(vueStore)
	await router.isReady()
	app.mount('#app')
	// document.getElementById('app')!.className =
	// 	'w-screen h-screen max-h-screen max-w-screen overflow-hidden'
}

setTimeout(setup, 0)
