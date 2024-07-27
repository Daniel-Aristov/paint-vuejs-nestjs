import { Module } from '@nestjs/common'
import { CanvasGateway } from './canvas.gateway'
import { SocketModule } from '../socket/socket.module'

@Module({
  imports: [SocketModule],
  providers: [CanvasGateway],
})
export class CanvasModule {}
