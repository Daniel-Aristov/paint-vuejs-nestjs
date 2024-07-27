import Tool from "./Tool"

export default class Brush extends Tool {
	private erasing: boolean

	constructor(canvas: HTMLCanvasElement) {
		super(canvas)
		this.erasing = false
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
