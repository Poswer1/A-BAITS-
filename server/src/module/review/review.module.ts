import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { AuthModule } from '../auth/auth.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [AuthModule, ChatModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
