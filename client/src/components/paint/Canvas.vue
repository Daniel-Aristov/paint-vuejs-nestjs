<template>
  <div class="canvas">
    <canvas
      width="1100"
      height="500"
      ref="canvasRef"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCanvasStore } from '../../store/canvasStore'
import { useToolStore } from '../../store/toolsStore'
import { mapStores } from 'pinia'
import Brush from '../../ts/tools/Brush'

export default defineComponent({
  computed: {
    ...mapStores(useCanvasStore, useToolStore),
  },
  mounted() {
    this.canvasStore.setCanvas(this.$refs.canvasRef as HTMLCanvasElement)
    this.toolStore.setTool(new Brush(this.$refs.canvasRef as HTMLCanvasElement))
    this.toolStore.setLineWidth(3)
  }
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.canvas {
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  border: 1px solid rgb(51, 51, 51);
  background-color: white;
  border-radius: 10px;
  margin-top: 50px;
}
</style>
