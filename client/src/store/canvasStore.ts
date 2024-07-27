import { defineStore } from 'pinia'

type CanvasState = {
  canvas: HTMLCanvasElement | null
  history: string[]
  redoStack: string[]
}

export const useCanvasStore = defineStore('canvas', {
  state: (): CanvasState => ({
    canvas: null,
    history: [],
    redoStack: [],
  }),
  actions: {
    setCanvas(canvas: HTMLCanvasElement) {
      this.canvas = canvas
      this.saveState()
    },
    saveState() {
      if (this.canvas) {
        this.history.push(this.canvas.toDataURL());
        this.redoStack = []
      }
    },
    undo() {
      if (this.history.length > 1) {
        const lastState = this.history.pop();
        if (lastState) {
          this.redoStack.push(lastState);
          this.restoreState(this.history[this.history.length - 1]);
        }
      }
    },
    redo() {
      if (this.redoStack.length > 0) {
        const nextState = this.redoStack.pop();
        if (nextState) {
          this.history.push(nextState);
          this.restoreState(nextState);
        }
      }
    },
    restoreState(state: string) {
      const img = new Image()
      img.src = state;
      img.onload = () => {
        if (this.canvas) {
          const ctx = this.canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            ctx.drawImage(img, 0, 0)
          }
        }
      }
    },
  }
})
