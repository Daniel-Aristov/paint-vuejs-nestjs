import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets'
import { SocketService } from '../socket/socket.service'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class CanvasGateway {
  @WebSocketServer()
  server: Server

  constructor(private readonly socketService: SocketService) {}

  afterInit(server: Server) {
    this.socketService.setServer(server)
  }

  @SubscribeMessage('draw')
  handleDraw(@MessageBody() data: string): void {
    this.server.emit('draw', data)
  }

  @SubscribeMessage('clear')
  handleClear(): void {
    this.server.emit('clear')
  }

  @SubscribeMessage('undo')
  handleUndo(): void {
    this.server.emit('undo')
  }

  @SubscribeMessage('redo')
  handleRedo(): void {
    this.server.emit('redo')
  }
}
