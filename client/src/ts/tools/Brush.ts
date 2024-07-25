import Tool from "./Tool"

export default class Brush extends Tool {
	private painting: boolean

	constructor(canvas: HTMLCanvasElement) {
		super(canvas)
		this.painting = false
		this.listen()
	}

	listen(): void {
		this.canvas.onmousedown = this.startPainting.bind(this)
		this.canvas.onmousemove = this.draw.bind(this)
		this.canvas.onmouseup = this.finishPainting.bind(this)
	}

	startPainting(e: MouseEvent): void {
		this.painting = true
		this.draw(e)
	}

	finishPainting(): void {
		this.painting = false
		if (this.ctx) this.ctx.beginPath()
	}

	draw(e: MouseEvent): void {
		if (!this.painting) return

		if (this.ctx) {
			this.ctx.lineWidth = 3
      this.ctx.lineCap = "round"

			this.ctx.lineTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop)
			this.ctx.stroke()
			this.ctx.beginPath()
			this.ctx.moveTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop)
		}
	}
}
