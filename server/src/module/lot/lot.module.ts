import { Module } from '@nestjs/common';
import { LotService } from './lot.service';
import { LotController } from './lot.controller';
import { LotGateway } from './lot.gateway';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { ViolationsModule } from '../admin/violations/violations.module';
import { FinanceModule } from '../admin/finance/finance.module';
import { LoggingModule } from '../admin/logging/logging.module';

@Module({
  imports: [AuthModule, ViolationsModule, FinanceModule, LoggingModule],
  controllers: [LotController],
  providers: [LotService, LotGateway],
})
export class LotModule {}
