import { Controller, Get, UseGuards } from "@nestjs/common";
impoty UserService
import { RolesGuard } from "../role.guards";
import { UserService } from "./user.service";

@UseGuards(RolesGuard)
@Controller('ActionOnTheUser')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get('getAllUser')
    async getAllUser () {
        return this.userService.getAllUser()
    }

}