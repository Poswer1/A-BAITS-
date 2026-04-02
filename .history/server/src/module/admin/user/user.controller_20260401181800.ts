import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../role.guards";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/module/auth/jwt/jwt-auth-guard";

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('ActionOnTheUser')
export class UserController {
    constructor (private readonly userService: UserService) {}
    
    @Get('getAllUser')
    async getAllUser () {
        return this.userService.getAllUser()
    }

    @Get('getCountRegisteredUsers')
    async getCountRegisteredUsers() {
        return this.userService.getCountRegisteredUsers()
    }

    @Get('getCountUsers')
    async getCountUsers() {
        return this.userService.getAllUserCount()
    }

    @Patch('changeStatus/:id')
    async changeStatus(@Param('id') id:string) {
        return this.userService.changeStatus(id)
    }

    @Patch('TemporaryBlocking')

    @Patch('updateBalance/:id')
    async updateBalance(@Body('balance') balance:number, @Param('id') id:string) {
        return this.userService.updateBalance(id, balance)
    }

    @Delete('deleteUser/:id')
    async deleteUser(@Param('id') id:string) {
        return this.userService.deleteUser(id)
    }

}