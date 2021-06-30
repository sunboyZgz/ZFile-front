import { Ref, InjectionKey } from 'vue'
import { createAsyncComponent } from '/@/utils/createAsyncCmp'
interface ContextOptions {
	smallScreen: Ref<boolean>
}
export const key: InjectionKey<ContextOptions> = Symbol('context')

export default createAsyncComponent(() => import('./AppContextProvider.vue'))
