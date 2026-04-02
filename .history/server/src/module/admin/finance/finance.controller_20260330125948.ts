import { Controller, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../role.guards";
import { JwtAuthGuard } from "src/module/auth/jwt/jwt-auth-guard";

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('finance') 
export class FinanceController {
    constructor () {}
}