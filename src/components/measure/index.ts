import { createAsyncComponent } from '/@/utils/createAsyncCmp'

export default createAsyncComponent(() => import('./index.vue'))
