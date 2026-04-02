import { Controller, Post, UseGuards } from '@nestjs/common';
import { ViolationsService } from './violations.service';
import { RolesGuard } from '../role.guards';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('violations')
export class ViolationsController {
  constructor(private readonly violationsService: ViolationsService) {}

  
}
