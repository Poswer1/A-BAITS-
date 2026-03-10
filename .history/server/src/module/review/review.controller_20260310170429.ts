import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { reviewDto } from './review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  
  @Post('newReview')
  async newReview(@Body() dto: reviewDto) {

  }
}
