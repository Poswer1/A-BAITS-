import { ChatService } from "./chat.service";
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getMyChat(userId: string): Promise<{
        unReadChats: (import("mongoose").Document<unknown, {}, import("../../models/chat.model").Chat, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/chat.model").Chat & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        readChats: (import("mongoose").Document<unknown, {}, import("../../models/chat.model").Chat, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/chat.model").Chat & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
}
