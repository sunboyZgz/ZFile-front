<template>
	<div
		id="code-mirror"
		class="sun-cm"
		:class="$attrs.class"
		:style="style"
		ref="fullRef"
		v-show="active"
	>
		<!-- cm header -->
		<div class="sun-cm-controlbar">
			<h4 class="sun-cm-title">{{ fileTitle }}</h4>
			<div class="sun-cm-buttons">
				<span
					class="sun-cm-btn red"
					@mouseenter="MouseMove"
					@mouseleave="
						e => {
							MouseMove(e, false)
						}
					"
					@click="closeFile"
					title="close"
				>
					<ali-icon code="close" />
				</span>
				<span
					class="sun-cm-btn yellow"
					@mouseenter="MouseMove"
					@mouseleave="
						e => {
							MouseMove(e, false)
						}
					"
					@click="smScreen"
					title="small"
				>
					<ali-icon code="suoxiao" />
				</span>
				<span
					class="sun-cm-btn green"
					@mouseenter="MouseMove"
					@mouseleave="
						e => {
							MouseMove(e, false)
						}
					"
					title="full"
					@click="fullScreen"
				>
					<ali-icon code="fangda" />
				</span>
			</div>
		</div>
		<!-- cm body -->
		<div @mouseenter="moveInto" @mouseleave="moveLeave">
			<div class="sun-cm-container hidden-scroll" ref="editor"></div>
			<Transition name="sun-cm-fade">
				<div class="sun-cm-addition" v-show="showButton">
					<copy-button :content="editorValue" />
					<slot name="addition"></slot>
				</div>
			</Transition>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watch, computed, onUnmounted } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { CodeModeType } from './type'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'
//here I'm not write a plugin to config the mode source js
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/mode/php/php.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/mode/css/css.js'
import { debounce } from '/@/utils/common'
import CopyButton from '../copyButton'
import { AliIcon } from '../'
const changeActive = (element: HTMLButtonElement | null, enter?: boolean) => {
	if (!element) return
	if (enter) {
		!element.classList.contains('active') && element.classList.add('active')
	} else {
		element.classList.contains('active') && element.classList.remove('active')
	}
}
export default defineComponent({
	name: 'SunCodeMirror',
	components: {
		CopyButton,
		AliIcon,
	},
	inheritAttrs: false,
	props: {
		fontSize: {
			type: Number,
			default: 16,
		},
		fileTitle: {
			type: String,
			default: 'new file',
		},
		editorValue: {
			type: String,
			default: '',
		},
		mode: {
			type: String as PropType<CodeModeType>,
			default: 'javascript',
		},
		active: {
			type: Boolean,
			default: true,
		},
		onOpen: {
			type: Function,
			default: null,
		},
		onInput: {
			type: Function,
			default: null,
		},
		onsave: {
			type: Function,
			default: null,
		},
		options: {
			type: Object as PropType<CodeMirror.EditorConfiguration>,
			default: () => {
				return {
					lineNumbers: false,
					indentUnit: 2,
					scrollbarStyle: null,
				}
			},
		},
	},
	emits: ['update:active', 'update:editorValue'],
	setup(props, { emit, attrs }) {
		const { onOpen, onInput, onsave } = props
		const fullRef = ref()
		const showButton = ref(false)
		const { enter, exit, isFullscreen } = useFullscreen(fullRef)
		const activeRef = ref(props.active)
		let cmInstance: CodeMirror.Editor | null
		const editor = ref(document.createElement('textarea'))
		let firstOpen = false
		watch(
			() => props.active,
			active => {
				activeRef.value = active
				if (active) {
					onOpen && onOpen()
				}
			},
			{
				immediate: true,
			}
		)
		watch(
			() => props.mode,
			mode => {
				if (cmInstance) {
					cmInstance.setOption('mode', mode)
				}
			},
			{
				immediate: true,
			}
		)
		watch(
			() => props.editorValue,
			value => {
				if (cmInstance && !firstOpen) {
					cmInstance.setValue(value)
					firstOpen = true
				}
			},
			{
				immediate: true,
			}
		)
		const style = computed(() => {
			const thisStyle = { lineHeight: '1', fontSize: props.fontSize + 'px' }
			return {
				...thisStyle,
				...(attrs.style as object),
			}
		})
		const save = cmInstance => {
			onsave && onsave()
		}
		onMounted(async () => {
			cmInstance = CodeMirror(editor.value, props.options)
			cmInstance.setOption('mode', props.mode)
			cmInstance.setOption('theme', 'material-darker')
			cmInstance.addKeyMap({ 'Ctrl-S': save })
			console.log('cmInstance', CodeMirror.keyNames)
			cmInstance.setValue(props.editorValue)
			cmInstance.on(
				'change',
				debounce((cm, cmobj) => {
					onInput && onInput(cm, cmobj)
					emit('update:editorValue', cm.getValue())
				}, 200)
			)
			cmInstance.on('optionChange', cm => {
				cm.refresh()
			})
		})

		onUnmounted(() => {
			cmInstance?.setValue('')
			emit('update:editorValue', '')
			cmInstance = null
			firstOpen = false
		})
		const MouseMove = (e: MouseEvent, enter = true) => {
			changeActive(e.target as HTMLButtonElement, enter)
		}
		const closeFile = () => {
			activeRef.value = false
			emit('update:active', activeRef.value)
		}
		const fullScreen = () => {
			if (isFullscreen.value) return
			enter()
		}
		const smScreen = () => {
			if (!isFullscreen.value) return
			exit()
		}
		const moveInto = () => {
			showButton.value = true
		}
		const moveLeave = () => {
			showButton.value = false
		}
		return {
			editor,
			MouseMove,
			closeFile,
			style,
			fullRef,
			fullScreen,
			smScreen,
			showButton,
			moveInto,
			moveLeave,
		}
	},
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
