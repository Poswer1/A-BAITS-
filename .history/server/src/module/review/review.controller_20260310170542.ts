import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { reviewDto } from './review.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth-guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post('newReview')
  async newReview(@Body() dto: reviewDto) {
    const userId = (req)
  }
}
