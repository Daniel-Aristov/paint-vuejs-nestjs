<template>
  <div class="canvas">
    <canvas
      width="900"
      height="500"
      ref="canvasRef"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCanvasStore } from '../store/canvasStore'
import { useToolStore } from '../store/toolsStore'
import { mapStores } from 'pinia'
import Brush from '../ts/tools/Brush'

export default defineComponent({
  data: function () {
    return {
    }
  },
  computed: {
    ...mapStores(useCanvasStore, useToolStore),
  },
  mounted() {
    this.canvasStore.setCanvas(this.$refs.canvasRef as HTMLCanvasElement)
    this.toolStore.setTool(new Brush(this.$refs.canvasRef as HTMLCanvasElement))
  }
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.canvas {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  border: 1px solid black;
  background-color: white;
}
</style>
