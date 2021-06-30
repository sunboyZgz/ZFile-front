import { createAsyncComponent } from '/@/utils/createAsyncCmp'
export const Menu = createAsyncComponent(() => import('./index.vue'))
export const MenuItem = createAsyncComponent(() => import('./MenuItem.vue'))
