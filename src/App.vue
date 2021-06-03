<template>
	<img />
	<HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
	<HelloJSX />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import HelloWorld from '/@/components/HelloWorld.vue'
import HelloJSX from './components/TestJSX.tsx'

export default defineComponent({
	name: 'App',
	components: {
		HelloWorld,
		HelloJSX,
	},
})
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
