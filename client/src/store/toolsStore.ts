import { defineStore } from 'pinia'
import Tool from '@/ts/tools/Tool'

type ToolState = {
  tool: Tool | null
}

export const useToolStore = defineStore('tool', {
  state: (): ToolState => ({
    tool: null,
  }),
  actions: {
    setTool(tool: Tool) {
      this.tool = tool;
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
