<template>
	<template v-if="!smallScreen">
		<n-dropdown
			placement="bottom-start"
			trigger="click"
			:options="options"
			:render-label="renderDropdownLabel"
		>
			<n-button class="text-gray-700" :class="$attrs.class" :keyboard="false">
				<NavIcon width="24" height="24" />
			</n-button>
		</n-dropdown>
	</template>
	<template v-else>
		<n-collapse class="nav-items rounded-md pl-2 py-2 shadow-md">
			<n-collapse-item :title="t('navMenu.title')" name="1" class="pr-2">
				<button
					v-for="item in options"
					:key="item.key"
					class="can-active nav-items w-[100%] rounded-md pl-2 py-2 shadow-md flex items-center"
					@click="() => handleSelect(item.key)"
				>
					<AliIcon class="icon dark:text-true-gray-200 !text-xl" code="exit" />
					<span class="ml-2">{{ item.label }}</span>
				</button>
			</n-collapse-item>
		</n-collapse>
	</template>
</template>

<script lang="ts">
import { computed, defineComponent, h } from 'vue'
import { useRouter, RouteRecordRaw } from 'vue-router'
import { useTypeI18n } from '/@/i18n'
import { NavIcon } from '/@/components/'
import { canNavigateRoutes } from '/@/router/routes/base'
import { useSmallSize } from '../hooks'
// enum dropDropKeys {
// 	SYSTEM = '1',
// }
//
// interface NavRouteRecordRaw extends RouteRecordRaw {

// }
type NavRouteRecordRaw = RouteRecordRaw & { label: string; key?: number | string }

export default defineComponent({
	name: 'NavMenu',
	components: {
		NavIcon,
	},
	setup() {
		const router = useRouter()
		const { t } = useTypeI18n()
		const smallScreen = useSmallSize()
		const options = computed(() => {
			const routes = canNavigateRoutes.filter(route => {
				const path = router.currentRoute.value.path
				const index = path.indexOf('/', 1)
				const current = index > 0 ? path.substring(0, index) : path
				return route.path !== current
			})
			const selections = (routes as unknown as NavRouteRecordRaw[]).map(route => {
				route.label = t(`navMenu.${route.name as string}`)
				route.key = route.meta?.key as number
				return route
			})
			return selections
		})

		const handleSelect = option => {
			console.log(option)
			const path = option.path
			const index = path.indexOf('/', 1)
			const current = index > 0 ? path.substring(0, index) : path
			// if (option.key === dropDropKeys.SYSTEM) {
			!!option && router.push(current)
			// }
		}
		const renderDropdownLabel = option => {
			return h(
				'div',
				{
					onclick: () => handleSelect(option),
				},
				{
					default: () => option.label,
				}
			)
		}
		return {
			options,
			handleSelect,
			renderDropdownLabel,
			smallScreen,
			t,
		}
	},
})
</script>
