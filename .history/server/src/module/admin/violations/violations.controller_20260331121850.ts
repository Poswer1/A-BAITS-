import { Controller, Post } from '@nestjs/common';
import { ViolationsService } from './violations.service';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('violations')
export class ViolationsController {
  constructor(private readonly violationsService: ViolationsService) {}

  
}
