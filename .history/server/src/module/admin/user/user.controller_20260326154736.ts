import { Controller, Get, UseGuards } from "@nestjs/common";
import { userService } from "./user.service";


@Controller('ActionOnTheUser')
export class UserController {
    constructor (private readonly userService: userService) {}

    @UseGuards()
    @Get('getAllUser')
    async getAllUser () {
        return this.userService.getAllUser()
    }

}