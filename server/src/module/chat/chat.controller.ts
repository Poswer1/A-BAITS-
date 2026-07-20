import { Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth-guard";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { RolesGuard } from "../admin/role.guards";

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService: ChatService) {}

    @UseGuards(JwtAuthGuard)
    @Get('getMyChat')
    async getMyChat(@CurrentUser('id') userId:string) {
        return this.chatService.getMyChat(userId)
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('getChatId/:userId/:lotId')
    async getChatId(
    @CurrentUser('id') myId: string,
    @Param('userId') userId: string,
    @Param('lotId') lotId: string,
    ) {
    return this.chatService.getChatId(myId, userId, lotId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('inviteAdmin/:id')
    async inviteAdmin(@Param('id') id:string) {
        return this.chatService.inviteAdmin(id)
    }

    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Patch('confirmInvite/:id')
    async confirmInvite(@Param('id') id:string, @CurrentUser('id') userId:string) {
        return this.chatService.confirmInvite(id, userId)
    }

}