import { Controller, Get, UseGuards } from "@nestjs/common";
import { userService } from "./user.service";
import { RolesGuard } from "../role.guards";


@Controller('ActionOnTheUser')
export class UserController {
    constructor (private readonly userService: userService) {}

    @UseGuards(RolesGuard)
    @Get('getAllUser')
    async getAllUser () {
        return this.userService.getAllUser()
    }

}