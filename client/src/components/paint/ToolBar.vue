<template>
  <div
    class="w-100 h-[50px] flex justify-between items-center bg-slate-100 py-[10px] border-b-2 border-purple-950"
  >
    <div class="flex items-center gap-[13px]">
      <ButtonTool
        :size="23"
        :bgImgUrl="'src/assets/images/pencil.png'"
        :title="'Карандаш'"
        @click="setBrush"
      />
      <ButtonTool
        :size="28"
        :bgImgUrl="'src/assets/images/eraser.png'"
        :title="'Ластик'"
        @click="setEraser"
      />
      <div class="flex items-center justify-center gap-[10px] ml-[30px]">
        <p class="text-lg mb-[3px]">Цвет линии:</p>
        <input
          class="w-[42px] text-sm p-[3px] cursor-pointer"
          type="color"
          title="Изменить цвет линии"
          @input="onColorChange"
          ref="colorInput"
        />
      </div>
      <div class="flex items-center justify-center gap-[10px] ml-[30px]">
        <p class="text-lg mb-[3px]">Ширина линии:</p>
        <input
          class="w-[42px] text-sm p-[3px] cursor-pointer"
          type="number"
          title="Изменить ширину линии"
          @input="onWidthLineChange"
          defaultValue="3"
          min="1"
          max="50"
          ref="widthLineInput"
        />
      </div>
    </div>
    <div class="flex items-center gap-[13px]">
      <ButtonTool
        :size="25"
        :bgImgUrl="'src/assets/images/undo.png'"
        :title="'Действие назад'"
        @click="undo"
      />
      <ButtonTool
        :size="25"
        :bgImgUrl="'src/assets/images/redo.png'"
        :title="'Действие вперед'"
        @click="redo"
      />
      <ButtonTool
        :size="25"
        :bgImgUrl="'src/assets/images/save.png'"
        :title="'Сохранить'"
        @click="saveImage"
      />
      <ButtonTool
        :size="25"
        :bgImgUrl="'src/assets/images/clear.png'"
        :title="'Очистить полотно'"
        @click="clearCanvas"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { io, Socket } from 'socket.io-client'
import { defineComponent } from 'vue'
import { useToolStore } from '@/store/toolsStore'
import { useCanvasStore } from '@/store/canvasStore'
import { mapStores } from 'pinia'
import Brush from '@/ts/tools/Brush'
import Eraser from '@/ts/tools/Eraser'
import ButtonTool from '@/components/paint/ButtonTool.vue'

export default defineComponent({
  data() {
    return {
      socket: io('http://localhost:3000') as Socket,
    }
  },
  components: {
    ButtonTool,
  },
  computed: {
    ...mapStores(useToolStore, useCanvasStore),
  },
  methods: {
    onColorChange() {
      const input = this.$refs.colorInput as HTMLInputElement
      this.toolStore.setStrokeColor(input.value)
    },
    onWidthLineChange() {
      const input = this.$refs.widthLineInput as HTMLInputElement
      this.toolStore.setLineWidth(+input.value)
    },
    setBrush() {
      const canvas = this.canvasStore.canvas
      if (canvas) {
        this.toolStore.setTool(new Brush(canvas, this.socket as Socket))
        this.onColorChange()
        this.onWidthLineChange()
      } else {
        console.error('Canvas модуль не инициализирован')
      }
    },
    setEraser() {
      const canvas = this.canvasStore.canvas
      if (canvas) {
        this.toolStore.setTool(new Eraser(canvas, this.socket as Socket))
      } else {
        console.error('Canvas модуль не инициализирован')
      }
    },
    saveImage() {
      const canvas = this.canvasStore.canvas
      if (canvas) {
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = 'canvas-image.png'
        link.click()
      } else {
        console.error('Canvas модуль не инициализирован')
      }
    },
    undo() {
      this.canvasStore.undo()
      this.socket.emit('undo')
    },
    redo() {
      this.canvasStore.redo()
      this.socket.emit('redo')
    },
    clearCanvas() {
      const canvas = this.canvasStore.canvas
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          this.canvasStore.saveState()
        }
      } else {
        console.error('Canvas модуль не инициализирован')
      }
    },
  },
})
</script>
