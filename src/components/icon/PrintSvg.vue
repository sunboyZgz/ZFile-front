<template>
	<svg
		version="1.1"
		id="zfile"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 480 480"
	>
		<path
			class="st0 write"
			d="M88.19,196.5c27.15,2.65,54.3,5.3,81.45,7.95c-2.39,7.24-8.15,12.77-13.71,17.98
	c-19.36,18.17-38.72,36.34-58.08,54.51c-2.84,2.67-5.95,6.25-4.79,9.97c1.24,3.98,6.4,4.99,10.56,4.72
	c6.32-0.41,12.47-2.13,18.53-3.94c22.8-6.79,45.2-14.93,67.04-24.35"
		/>
		<path
			class="st0 write"
			d="M279.83,133.15c-9.42-1.94-19.37,1.93-26.49,8.39c-7.12,6.46-11.74,15.23-15.17,24.21
	c-4.67,12.25-7.38,25.26-7.98,38.36c-0.83,18.27,2.39,36.44,4.03,54.66c1.64,18.21,1.6,37.15-5.39,54.05s-22.25,31.39-40.48,32.83
	c-11.06,0.88-21.86-2.96-32.73-5.16"
		/>
		<path
			class="st0 write"
			d="M188.23,239.37c-0.93,0.13-1.87,0.25-2.8,0.38c31.51-7.7,62.01-21.24,94.42-22.52"
		/>
		<path
			class="st0 write"
			d="M323.2,223.54c-0.39,1.45-1.24,2.72-2.04,4c-8.48,13.62-10.76,30.93-6.09,46.28c0.9,2.96,2.31,6.13,5.15,7.35
	c0.01-2.13,0.02-4.26,0.03-6.39"
		/>
		<path
			class="st0 write"
			d="M329.15,192.41c-1.74,0.56-3.07,2.35-2.91,4.17s1.94,3.4,3.76,3.17c1.82-0.23,3.16-2.39,2.42-4.06
	c-1.06-0.07-2.12-0.14-3.18-0.21"
		/>
		<path
			class="st0 write"
			d="M362.95,254.74c15.22-4.53,30.09-10.2,44.46-16.96c4.81-2.26,10.16-5.46,10.8-10.73
	c0.74-6.05-5.27-10.77-11.02-12.79c-6.92-2.44-14.67-2.95-21.58-0.48c-5.74,2.05-10.63,6.03-14.65,10.6
	c-7.48,8.49-12.37,19.67-11.62,30.96c0.75,11.29,7.84,22.38,18.49,26.21c9.01,3.24,19.02,1.14,28.17-1.69
	c9.12-2.82,18.41-6.61,24.62-13.87"
		/>
	</svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'PrintSvg',

	/**
	 * @description the work flow of paint animation
	setup() {
		let timer
		let timeouter
		onMounted(() => {
			timer = setInterval(() => {
				const paths = document.querySelectorAll<SVGElement>('#zfile .st0')
				paths.forEach((path: SVGPathElement, index) => {
					const len = path.getTotalLength()
					path.style.transition = 'stroke-dashoffset .5s'
					path.style.transitionDelay = 0.5 * index + 's'
					path.style.strokeDashoffset = len + '0'
				})

				timeouter = setTimeout(() => {
					paths.forEach((path: SVGPathElement, index) => {
						const len = path.getTotalLength()
						path.style.strokeDashoffset = '0'
						path.style.strokeDasharray = len + ' ' + len
					})
					clearTimeout(timeouter)
				}, 3000)
			}, 10000)
		})
		onUnmounted(() => {
			clearInterval(timer)
		})
	}
	setup() {
		// onMounted(() => {
		// 	const paths = document.querySelectorAll<SVGElement>('#zfile>path')
		// 	console.log(paths)
		// 	let timer: null | number
		// 	timer = setTimeout(() => {
		// 		paths.forEach((path: SVGPathElement, index) => {
		// 			path.classList.add('!block')
		// 		})
		// 		clearTimeout(timer!)
		// 		timer = null
		// 	}, 1000) as unknown as number
		// })
	},,*/
})
</script>

<style lang="scss">
@keyframes writePath {
	0% {
		stroke: black;
		stroke-dasharray: 100% 100%;
		stroke-dashoffset: 100%;
		transition: stroke-dashoffset 1s linear;
	}
	100% {
		stroke-dashoffset: 0%;
		stroke: black;
	}
}
.write {
	animation: writePath 1s;
}
%write-path {
	fill: none;
	stroke: none;
	stroke-width: 14;
	stroke-miterlimit: 0;
}
@for $i from 1 through 6 {
	#zfile path:nth-child(#{$i}).st0 {
		@extend %write-path;
		&.write {
			animation-delay: $i * 1s;
			animation-fill-mode: forwards;
		}
	}
}
</style>
