<template>
	<div class="sun-img">
		<img class="sun-img-pic" ref="imgRef" :src="src" />
		<!-- <div v-else class="sun-img-loading">
      <slot>
        <span>加载中...</span>
      </slot>
    </div> -->
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
	name: 'SunImg',
	props: {
		src: {
			type: String,
			default: '',
		},
	},
	setup() {
		const imgRef = ref(document.createElement('img'))

		return {
			imgRef,
		}
	},
})
</script>

<style lang="scss" scoped>
$prefixer: sun-img;
.#{$prefixer} {
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.#{$prefixer}-pic {
	height: 100%;
	object-fit: contain;
}
.#{$prefixer}-loading {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
