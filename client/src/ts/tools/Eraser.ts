import Tool from "./Tool"
import { useCanvasStore } from '../../store/canvasStore'
import { Socket } from 'socket.io-client'

export default class Brush extends Tool {
	private erasing: boolean
	private socket: Socket

	constructor(canvas: HTMLCanvasElement, socket: Socket) {
		super(canvas)
		this.erasing = false
		this.socket = socket
		this.listen()
	}

	listen(): void {
		this.canvas.onmousedown = this.startPainting.bind(this)
		this.canvas.onmousemove = this.draw.bind(this)
		this.canvas.onmouseup = this.finishPainting.bind(this)
	}

	startPainting(e: MouseEvent): void {
		this.erasing = true
		this.draw(e)
	}

	finishPainting(): void {
		this.erasing = false
		if (this.ctx) this.ctx.beginPath()
		const canvasStore = useCanvasStore()
    canvasStore.saveState()
		this.socket.emit('draw', this.canvas.toDataURL())
	}

	draw(e: MouseEvent): void {
		if (!this.erasing) return

		if (this.ctx) {
			this.ctx.lineWidth = this.ctx.lineWidth || 10
      this.ctx.lineCap = "round"
			this.ctx.strokeStyle = '#fff'

			this.ctx.lineTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop)
			this.ctx.stroke()
			this.ctx.beginPath()
			this.ctx.moveTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop)
		}
	}
}
