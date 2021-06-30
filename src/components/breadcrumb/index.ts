import { createAsyncComponent } from '/@/utils/createAsyncCmp'

export const Breadcrumb = createAsyncComponent(() => import('./Breadcrumb'))
export { default as BreadItem } from './BreadItem'
