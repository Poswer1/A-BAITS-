import { Controller, Get, UseGuards } from "@nestjs/common";
impoty UserS
import { RolesGuard } from "../role.guards";

@UseGuards(RolesGuard)
@Controller('ActionOnTheUser')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get('getAllUser')
    async getAllUser () {
        return this.userService.getAllUser()
    }

}