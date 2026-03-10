import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { reviewDto } from './review.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth-guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post('newReview')
  async newReview(@Body() dto: reviewDto, @Req() req:any) {
    const userId = (req.user as any)._id
    return this.reviewService.newReview(userId, dto)
  }
}
