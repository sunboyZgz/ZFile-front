<template>
	<img />
	<Counter />
	<router-view />
	<router-link to="/login">home</router-link>
	<router-link to="/test">test</router-link>
	<br />
	<el-button type="primary">提交</el-button>
	<el-button type="danger">删除</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePageTitle } from '/@/hooks/'
export default defineComponent({
	name: 'App',
	components: {},
	setup() {
		usePageTitle()
	},
})
</script>

<style></style>
