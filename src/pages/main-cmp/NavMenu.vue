<template>
	<template v-if="!smallScreen">
		<n-dropdown placement="bottom-start" trigger="click" :options="options" @select="handleSelect">
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
import { computed, defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useTypeI18n } from '/@/i18n'
import { NavIcon } from '/@/components/'
import { key } from '/@/components/context/'
enum dropDropKeys {
	SYSTEM = '1',
}

export default defineComponent({
	name: 'NavMenu',
	components: {
		NavIcon,
	},
	setup() {
		const router = useRouter()
		const { t } = useTypeI18n()
		const smallScreen = inject(key)?.smallScreen
		const options = computed(() => {
			const systemLabel = t('navMenu.System')
			return [
				{
					label: systemLabel,
					key: dropDropKeys.SYSTEM,
				},
			]
		})

		const handleSelect = key => {
			if (key === dropDropKeys.SYSTEM) {
				router.push('/system')
			}
		}

		return {
			options,
			handleSelect,
			smallScreen,
			t,
		}
	},
})
</script>
