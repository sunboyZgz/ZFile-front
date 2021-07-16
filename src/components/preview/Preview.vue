<template>
	<teleport to="#sun-preview">
		<div class="mask" v-show="show">
			<div class="close-btn" @click="close"></div>
			<div class="sun-preview-body">
				<div class="sun-preview-container">
					<img class="sun-preview" :src="curPic" />
				</div>
			</div>

			<div class="sun-preview-bottom">
				<!-- control bar -->
				<!-- <div class="sun-preview-toolbar">
          <span class="sun-preview-btn">1</span>
          <span class="sun-preview-btn">2</span>
          <span class="sun-preview-btn">3</span>
          <span class="sun-preview-btn">4</span>
        </div> -->
				<div class="sun-preview-list">
					<!-- small preview -->
					<div class="sun-preview-list-item">
						<sun-img
							class="sun-preview-list-img"
							v-for="(src, index) in picList"
							:src="src"
							:key="index"
						/>
						<!-- <div class="sun-preview-list-img">
              <img
                class="sun-preview-img"
                src="https://www.boyucode.com/cloud/4.jpg"
              />
            </div> -->
					</div>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { toBody } from '/@/components/utils'
import SunImg from './LoadImg.vue'

export default defineComponent({
	name: 'SunPreview',
	components: {
		SunImg,
	},
	props: {
		show: {
			type: Boolean,
			default: true,
		},
		picList: {
			type: Array as PropType<string[]>,
			default() {
				return []
			},
		},
		active: {
			type: Number,
			default: 0,
		},
	} as const,
	emits: ['update:show'],
	setup(props, { emit }) {
		toBody(document.createElement('div'), 'sun-preview')
		// const picList = toRef(props, 'picList')
		// const active = toRef(props, 'active')
		const curPic = computed(() => {
			return Array.isArray(props.picList) ? props.picList[props.active] : ''
		})
		const close = () => {
			emit('update:show', false)
		}
		return {
			close,
			curPic,
		}
	},
})
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import './index.scss';
</style>
