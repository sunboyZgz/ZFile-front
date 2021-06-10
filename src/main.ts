import { createApp, watch } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import { setupI18n } from './i18n/'
import { setupElm } from './setupUI'

import vueStore from './store/'
import router from './router/'

// console.log(import.meta.env)

async function setup() {
	const app = createApp(App)
	setupI18n(app)
	app.use(router)
	setupElm(app)
	app.use(vueStore)
	await router.isReady()
	app.mount('#app')
}
setTimeout(setup, 2000)
