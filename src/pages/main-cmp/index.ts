import { createAsyncComponent } from '/@/utils/createAsyncCmp'

export { default as FileAdd } from './FileAdd.vue'
export { default as FileTable } from './FileTable.vue'
export { default as FileTableItem } from './FileTableItem.vue'
export { default as FolderAdd } from './FolderAdd.vue'
export const LeftMenu = createAsyncComponent(() => import('./LeftMenu.vue'))
export const Profile = createAsyncComponent(() => import('./Profile.vue'))
export const NavMenu = createAsyncComponent(() => import('./NavMenu.vue'))
export { default as ProgressBox } from './ProgressBox.vue'
