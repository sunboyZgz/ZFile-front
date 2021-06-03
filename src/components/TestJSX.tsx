import { defineComponent, ref } from 'vue'
export default defineComponent({
	name: 'VueJsx',
	setup() {
		const counter1 = ref(1)
		return () => {
			return (
				<>
					<div>counter number :{counter1.value}</div>
					<button
						onClick={() => {
							counter1.value += 1
							console.log(1)
						}}
					>
						+
					</button>
				</>
			)
		}
	},
})
