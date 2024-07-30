<template>
  <div class="flex justify-center items-center">
    <canvas
      class="bg-slate-100 mt-[30px] border-2 border-purple-950 rounded-lg"
      width="1100"
      height="550"
      ref="canvasRef"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { io, Socket } from 'socket.io-client'
import { useCanvasStore } from '@/store/canvasStore'
import { useToolStore } from '@/store/toolsStore'
import Brush from '@/ts/tools/Brush'

export default defineComponent({ 
  data() {
    return {
      socket: null as Socket | null,
    }
  },
  mounted() {
    this.socket = io('http://localhost:3000')

    this.socket.on('draw', (data) => {
      const canvas = this.canvasStore.canvas
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          const image = new Image()
          image.src = data
          image.onload = () => {
            ctx.drawImage(image, 0, 0)
          }
        }
      }
    })

    this.socket.on('clear', () => {
      this.clearCanvas()
    })

    this.socket.on('undo', () => {
      this.canvasStore.undo()
    })

    this.socket.on('redo', () => {
      this.canvasStore.redo()
    })

    this.canvasStore.setCanvas(this.$refs.canvasRef as HTMLCanvasElement)
    this.toolStore.setTool(new Brush(this.$refs.canvasRef as HTMLCanvasElement, this.socket as Socket))
    this.toolStore.setLineWidth(3)
  },
  computed: {
    ...mapStores(useCanvasStore, useToolStore),
  },
  methods: {
    clearCanvas() {
      const canvas = this.canvasStore.canvas
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          this.canvasStore.saveState()
        }
      }
    },
  }
})
</script>
