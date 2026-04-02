import { Controller, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../role.guards";

@UseGuards(RolesGuard)
@Controller('finance') 
export class FinanceController {

}