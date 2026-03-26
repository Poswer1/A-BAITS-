import { Controller, Get } from "@nestjs/common";


@Controller('ActionOnTheUser')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get('getAllUser')
    async getAllUser () {
        return this.userService.
    }

}