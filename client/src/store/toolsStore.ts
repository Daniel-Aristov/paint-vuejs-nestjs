import { defineStore } from 'pinia'

interface ToolState {
  tool: any
}

export const useToolStore = defineStore('tool', {
  state: (): ToolState => ({
    tool: null,
  }),
  actions: {
    setTool(tool: any) {
      this.tool = tool;
    },
    setFillColor(color: string) {
      if (this.tool) {
        this.tool.fillColor = color
      }
    },
    setStrokeColor(color: string) {
      if (this.tool) {
        this.tool.strokeColor = color
      }
    },
    setLineWidth(width: number) {
      if (this.tool) {
        this.tool.lineWidth = width
      }
    },
  },
})
