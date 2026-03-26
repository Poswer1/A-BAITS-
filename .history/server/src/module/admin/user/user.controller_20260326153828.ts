import { Controller, Get } from "@nestjs/common";
import { userService } from "./user.service";


@Controller('ActionOnTheUser')
export class UserController {
    constructor (private readonly userService: userService) {}

    @Get('getAllUser')
    async getAllUser () {
        return this.userServic
    }

}