import { Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth-guard";

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService: ChatService) {}

    @UseGuards(JwtAuthGuard)
    @Get('getMyChat')
    async getMyChat(@Req() req:any) {
        return this.chatService.getMyChat(userId)
    }

}