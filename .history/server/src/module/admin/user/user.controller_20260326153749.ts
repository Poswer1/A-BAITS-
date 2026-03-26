import { Controller, Get } from "@nestjs/common";
import { UserService } from "src/module/user/user.service";

@Controller('ActionOnTheUser')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get('getAllUser')
    async getAllUser () {
        
    }

}