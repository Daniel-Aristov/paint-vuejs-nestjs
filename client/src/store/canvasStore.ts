import { defineStore } from 'pinia'

interface CanvasState {
  canvas: HTMLCanvasElement | null
  socket: WebSocket | null
  sessionid: string | null
  undoList: string[]
  redoList: string[]
  username: string,
}

export const useCanvasStore = defineStore('canvas', {
  state: (): CanvasState => ({
    canvas: null,
    socket: null,
    sessionid: null,
    undoList: [],
    redoList: [],
    username: '',
  }),
  actions: {
    setCanvas(canvas: HTMLCanvasElement) {
      this.canvas = canvas
    },
  }
})
