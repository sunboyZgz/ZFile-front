<template>
	<div
		class="
			h-12
			w-full
			flex
			transition-colors
			text-left
			cursor-pointer
			bg-light-50
			dark:bg-blue-gray-600
		"
		hover="bg-blue-50 dark:bg-blue-gray-700"
	>
		<div class="file-item-name pl-12 dark:text-warm-gray-300">
			<AliIcon :code="codeShow" class="!text-3xl mr-8" />
			<span
				v-if="!isFocus"
				class="whitespace-nowrap overflow-ellipsis overflow-hidden w-28 lg:w-auto"
				:title="fileInfo.fileName"
				>{{ fileInfo.fileName }}</span
			>
			<n-input
				v-else
				class="whitespace-nowrap overflow-ellipsis overflow-hidden max-w-60 lg:w-auto"
				:on-input="changeInput"
				:on-blur="onBlur"
				:value="fileInfo.fileName"
				placeholder=""
				:autofocus="true"
			/>
		</div>
		<div class="file-item-time hidden lg:block indent-sm dark:text-warm-gray-300">
			{{ fileInfo.dateTime }}
		</div>
		<div class="file-item-size indent-sm dark:text-warm-gray-300">{{ fileInfo.fileSize }}</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRef } from 'vue'
import { AliIcon } from '/@/components/'
import { fileDetail } from '/@/store/modules/fileSys'
import { fileType, FileType } from './_utils'

const set = new Set<FileType>(fileType)
export default defineComponent({
	name: 'FileTableItem',
	components: {
		AliIcon,
	},
	props: {
		fileInfo: {
			type: Object as PropType<Partial<Omit<fileDetail, 'id'>>>,
			default() {
				return {
					fileType: 'unknow',
					fileName: '--',
					fileSize: '--',
					dateTime: '--',
				}
			},
		} as const,
		isFocus: {
			type: Boolean,
			default: false,
		},
		onBlur: {
			type: Function,
			default: null,
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const activeRef = ref(false)
		const fileInfoRef = toRef(props, 'fileInfo')
		const codeShow = computed(() => {
			return set.has(fileInfoRef.value.fileType!) ? fileInfoRef.value.fileType : 'unknow'
		})
		const changeInput = value => {
			emit('update:modelValue', value)
		}
		return {
			activeRef,
			codeShow,
			changeInput,
		}
	},
})
</script>

<style lang="scss" scoped>
.file-item-name,
.file-item-time,
.file-item-size {
	height: 100%;
	line-height: 3rem;
}
.file-item-name {
	display: flex;
	align-items: center;
	flex: 8;
}
.file-item-time {
	min-width: 7rem;
	flex: 3;
}
.file-item-size {
	min-width: 6rem;
	flex: 3;
}
</style>
