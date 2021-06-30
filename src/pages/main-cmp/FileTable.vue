<template>
	<div class="file-table-head">
		<div class="head-name">name</div>
		<div class="head-time">time</div>
		<div class="head-size">size</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'FileTable',
})
</script>

<style lang="scss">
@import '../../components/style/base';
.file-table-head {
	background-color: $bg_dark--sm;
	height: 3rem;
	display: flex;
	align-items: center;
	text-align: left;
	padding: 0 0 0 3rem;
	color: white;
	.head-name {
		flex: 1;
	}
	.head-time {
	}
}
</style>
