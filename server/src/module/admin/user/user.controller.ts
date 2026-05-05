import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../role.guards";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/module/auth/jwt/jwt-auth-guard";

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('ActionOnTheUser')
export class UserController {
    constructor (private readonly userService: UserService) {}
    
    @Get('getAllUser')
    async getAllUser (
        @Query('page') page: number = 1,
        @Query('sort') sort: string = 'createdAt',
        @Query('order') order: string = 'desc',
        @Query('search') search: string = ''
    ) {
        return this.userService.getAllUser(page, sort, order, search)
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

    @Patch('TemporaryBlock/:id')
    async TemporaryBlock(@Param('id') id:string, @Body('day') day:number) {
        return this.userService.TemporaryBlock(id, day)
    }

    @Patch('updateBalance/:id')
    async updateBalance(@Body('balance') balance:number, @Body('balanceType') balanceType:string, @Param('id') id:string) {
        return this.userService.updateBalance(id, balance, balanceType)
    }

    @Delete('deleteUser/:id')
    async deleteUser(@Param('id') id:string) {
        return this.userService.deleteUser(id)
    }

}