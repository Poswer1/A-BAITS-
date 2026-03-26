import { Controller, Get } from "@nestjs/common";


@Controller('ActionOnTheUser')
export class UserController {
    constructor (private readonly userService: UserS) {}

    @Get('getAllUser')
    async getAllUser () {
        return this.userService.
    }

}