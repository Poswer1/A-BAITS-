import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ViolationsService } from './violations.service';
import { RolesGuard } from '../role.guards';
import { JwtAuthGuard } from 'src/module/auth/jwt/jwt-auth-guard';

@UseGuards(JwtAuthGuard)
@Controller('violations')
export class ViolationsController {
  constructor(private readonly violationsService: ViolationsService) {}
  
  @UseGuards(RolesGuard)
  @Get('getAllViolations')
  async getAllViolations() {
    return this.violationsService.getAllViolations()
  }

  @Get('getMyViolations')
  as

}
