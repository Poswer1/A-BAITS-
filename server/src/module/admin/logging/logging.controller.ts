import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { JwtAuthGuard } from 'src/module/auth/jwt/jwt-auth-guard';
import { RolesGuard } from '../role.guards';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('logging')
export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @Get('getAllLogs')
  async getAllLogs(
    @Query('page') page: number = 1,
    @Query('sort') sort: string = 'createdAt',
    @Query('order') order: string = 'desc'
  ) {
    return this.loggingService.getAllLogs(page, sort, order)
  }
 
}
