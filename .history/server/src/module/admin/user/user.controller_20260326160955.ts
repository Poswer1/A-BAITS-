import { Controller, Get, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../role.guards";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/module/auth/jwt/jwt-auth-guard";
import { CurrentUser } from "src/decorator/current-user.decorator";

@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Controller('ActionOnTheUser')
export class UserController {
    constructor (private readonly userService: UserService, @CurrentUser('id') userId:string) {}

    @Get('getAllUser')
    async getAllUser () {
        return this.userService.getAllUser()
    }

}