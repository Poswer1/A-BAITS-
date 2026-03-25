import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserGateway } from './user.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule]
  controllers: [UserController],
  providers: [UserService, UserGateway],
})
export class UserModule {}
