import { Controller, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../role.guards";

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('finance') 
export class FinanceController {

}