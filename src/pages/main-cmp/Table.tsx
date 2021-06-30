import { h, defineComponent, ref } from 'vue'
import { NTag, useMessage } from 'naive-ui'
import { useRightClick } from '/@/hooks/useRightClick'
const createData = () => [
	{
		key: 0,
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	},
	{
		key: 1,
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['wow'],
	},
	{
		key: 2,
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
	{
		key: 3,
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
	{
		key: 4,
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
	{
		key: 5,
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
	{
		key: 6,
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
	{
		key: 7,
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
	{
		key: 8,
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
	{
		key: 9,
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
	{
		key: 10,
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
	{
		key: 11,
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
]
export default defineComponent({
	name: 'FileTable',
	setup() {
		const message = useMessage()
		const show = ref(true)
		const createColumns = ({ sendMail }) => {
			return [
				{
					title: 'file name',
					key: 'name',
				},
				{
					title: 'last modified',
					key: 'age',
				},
				{
					title: 'size',
					key: 'address',
				},
				{
					title: 'control',
					key: 'tags',
					render(row) {
						const tags = row.tags.map(tagKey => {
							return h(
								NTag,
								{
									style: {
										marginRight: '6px',
									},
									type: 'info',
								},
								{
									default: () => tagKey,
								}
							)
						})
						return tags
					},
				},
			]
		}
		return () => {
			const data = createData()
			const rowProps = row => {
				return {
					style: 'cursor: pointer;',
					// onClick: (e: MouseEvent) => {
					// 	e.preventDefault()
					// 	e.stopPropagation()
					// 	message.info(row.name)
					// },
					onContextmenu: (e: MouseEvent) => {
						e.preventDefault()
						show.value = true
						console.log(e)
						useRightClick(e)
					},
				}
			}
			const columns = createColumns({
				sendMail(rowData) {
					message.info('send mail to ' + rowData.name)
				},
			})
			return (
				<>
					<v-contextmenu ref='contextRef' v-mode:value={show}>
						<v-contextmenu-item>打开</v-contextmenu-item>
						<v-contextmenu-divider />
						<v-contextmenu-item>查看</v-contextmenu-item>
					</v-contextmenu>
					<n-data-table columns={columns} data={data} row-props={rowProps} />
				</>
			)
		}
	},
})
