import { Module } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'
import { SocketModule } from '../socket/socket.module'

@Module({
  imports: [SocketModule],
  providers: [ChatGateway],
})
export class ChatModule {}
