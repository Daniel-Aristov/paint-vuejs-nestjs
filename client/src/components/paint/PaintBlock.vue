<template>
	<div>
		<ToolBar />
    <Canvas />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Canvas from '@/components/paint/Canvas.vue'
import ToolBar from '@/components/paint/ToolBar.vue'

export default defineComponent({
	components: {
		Canvas,
    ToolBar,
	}
})
</script>

<style lang="scss">
	
</style>
