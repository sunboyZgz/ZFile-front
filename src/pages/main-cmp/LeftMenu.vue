<template>
	<div>
		<a :href="github" class="block relative left-2 w-18 h-18">
			<img src="../../assets/logo.png" class="w-20" />
		</a>
		<Menu :mode="MenuMode.VERTICAL" class="ml-6 mt-8">
			<MenuItem v-for="item in navItems" :key="item.key" :title="item.title" :onclick="item.click">
				<div class="nav-btn">
					<AliIcon class="icon dark:text-true-gray-200 !text-xl" :code="item.code" />
				</div>
			</MenuItem>
			<MenuItem>
				<FolderAdd class="nav-btn relative cursor-pointer overflow-hidden" />
			</MenuItem>
			<MenuItem>
				<FileAdd class="nav-btn relative cursor-pointer overflow-hidden" />
			</MenuItem>
			<MenuItem>
				<div class="nav-btn">
					<AliIcon
						class="icon dark:text-true-gray-200 !text-xl"
						code="exit"
						:title="t('table.leftnav.sign-out')"
						@click="toSignOut"
					/>
				</div>
			</MenuItem>
		</Menu>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef, computed, ComputedRef, ref, inject } from 'vue'
import { Menu, MenuItem, AliIcon } from '/@/components/'
import { key } from '/@/components/context'
import { FolderAdd, FileAdd } from './'
import { MenuMode } from '/@/components/easy-menu/_utils'
import { useFullscreen } from '@vueuse/core'
import type { NavItem } from '../Main.vue'
import { useTypeI18n } from '/@/i18n'
import { useSignout } from './_utils'
const github = import.meta.env.VITE_GITHUB

export default defineComponent({
	name: 'LeftMenu',
	components: {
		Menu,
		MenuItem,
		AliIcon,
		FolderAdd,
		FileAdd,
	},
	props: {
		dom: {
			type: Object as PropType<HTMLDivElement | null>,
			default: null,
		},
	},
	setup(props) {
		const dom = toRef(props, 'dom')
		const active = ref(false)
		const { isFullscreen, enter } = useFullscreen(dom)
		const { t } = useTypeI18n()
		const smallScreen = inject(key)?.smallScreen
		const navItems: ComputedRef<(NavItem & { click?: (e: MouseEvent) => void })[]> = computed(
			() => {
				const fullscreen = t('table.leftnav.fullScreen')
				// const download = t('tablle.leftnav.download')
				return [
					{
						code: 'quanping',
						activeCode: 'xiaoping',
						active: isFullscreen,
						key: 1,
						title: fullscreen,
						click: () => {
							enter()
						},
					},
					// {
					// 	code: 'xiazai',
					// 	key: 4,
					// 	title: download,
					// },
				]
			}
		)
		const toSignOut = useSignout()
		const activeChange = isShow => {
			active.value = isShow
		}
		const showPanel = () => {
			active.value = true
		}
		return {
			MenuMode,
			navItems,
			github,
			toSignOut,
			t,
			active,
			activeChange,
			showPanel,
			smallScreen,
		}
	},
})
</script>
<style lang="scss">
.nav-btn {
	width: 2.5rem;
	border-radius: 9999px;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2.5rem;
	&:hover {
		cursor: pointer;
		background-color: rgb(83, 77, 184);
		.icon {
			color: white;
		}
	}
}
</style>
