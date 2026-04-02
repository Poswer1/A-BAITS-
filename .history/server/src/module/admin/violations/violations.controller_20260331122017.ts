import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ViolationsService } from './violations.service';
import { RolesGuard } from '../role.guards';
import { JwtAuthGuard } from 'src/module/auth/jwt/jwt-auth-guard';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('violations')
export class ViolationsController {
  constructor(private readonly violationsService: ViolationsService) {}

  @Get('getAllViolations')
  async

}
