import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { JwtAuthGuard } from 'src/module/auth/jwt/jwt-auth-guard';
import { RolesGuard } from '../role.guards';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('logging')
export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @Get('getAllLogs')
  async getAllLogs() {
    return this.loggingService.getAllLogs()
  }
 
}
