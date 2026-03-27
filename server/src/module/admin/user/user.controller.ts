import { Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../role.guards";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/module/auth/jwt/jwt-auth-guard";
import { CurrentUser } from "src/decorator/current-user.decorator";

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('ActionOnTheUser')
export class UserController {
    constructor (private readonly userService: UserService) {}
    
    @Get('getAllUser')
    async getAllUser () {
        return this.userService.getAllUser()
    }

    @Patch('changeStatus/:id')
    async changeStatus(@Param('id') id:string) {
        return this.userService.changeStatus(id)
    }

}