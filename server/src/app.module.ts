import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ChatModule } from './chat/chat.module'
import { CanvasModule } from './canvas/canvas.module';
import { SocketModule } from './socket/socket.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SocketModule, ChatModule, CanvasModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
