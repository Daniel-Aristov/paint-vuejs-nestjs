<template>
  <div class="bar">
    <div class="bar__left">
      <button
        type="button"
        title="Карандаш"
        class="bar__btn brush"
        @click="setBrush"
      ></button>
      <button
        type="button"
        title="Ластик"
        class="bar__btn eraser"
        @click="setEraser"
      ></button>
      <div class="line-color">
        <p>Цвет линии:</p>
        <input
          type="color"
          title="Изменить цвет линии"
          @input="onColorChange"
          ref="colorInput"
        />
      </div>
      <div class="line-width">
        <p>Ширина линии:</p>
        <input
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
    <div class="bar__right">
      <button
        type="button"
        title="Действие назад"
        class="bar__btn undo"
        @click="undo"
      ></button>
      <button
        type="button"
        title="Действие вперед"
        class="bar__btn redo"
        @click="redo"
      ></button>
      <button
        type="button"
        title="Сохранить"
        class="bar__btn save"
        @click="saveImage"
      ></button>
      <button
        type="button"
        title="Очистить полотно"
        class="bar__btn clear"
        @click="clearCanvas"
      ></button>
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

export default defineComponent({
  data() {
    return {
      socket: io('http://localhost:3000') as Socket,
    }
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

<style lang="scss">
@import '@/styles/variables.scss';

.bar {
  height: $bar-height;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #791293;
  padding: 0 10px;

  &__left,
  &__right {
    display: flex;
    align-items: center;
    gap: 13px;
  }

  &__btn {
    height: 25px;
    width: 25px;
    border: none;
    outline: none;
    cursor: pointer;
    background-size: cover;
  }

  .brush {
    background: url('../../assets/images/pencil.png') no-repeat center center;
    background-size: 23px;
  }

  .eraser {
    background: url('../../assets/images/eraser.png') no-repeat center center;
    background-size: 28px;
  }

  .line-width,
  .line-color {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 30px;

    p {
      font-size: 17px;
      margin-bottom: 3px;
    }

    input {
      width: 42px;
      font-size: 14px;
      padding: 3px;
    }
  }

  .undo {
    background: url('../../assets/images/undo.png') no-repeat center center;
  }

  .redo {
    background: url('../../assets/images/redo.png') no-repeat center center;
  }

  .save {
    background: url('../../assets/images/save.png') no-repeat center center;
  }

  .clear {
    background: url('../../assets/images/clear.png') no-repeat center center;
    background-size: 25px;
  }
}
</style>
