import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ChatModel } from "src/models/chat.model";
import { ReviewModel } from "src/models/review";
import { LotModel } from "src/models/lot.model";
import { NotificationGateway } from "../notification/notification.gateway";

@Injectable()
export class ChatCronService {
  constructor(
    private readonly notificationGateWay: NotificationGateway
  ) {}

  @Cron('0 0 * * *')
  async checkStaleChats() {
    try {
      const now = new Date();
      const threshold = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

      const staleChats = await ChatModel.find({
        status: 'Active',
        createdAt: { $lte: threshold }
      });

      if (staleChats.length === 0) return;

      for (const chat of staleChats) {
        try {
          const reviewCount = await ReviewModel.countDocuments({
            lot: chat.lot,
            from: { $in: chat.users },
            to: { $in: chat.users }
          });

          if (reviewCount > 0) continue;

          chat.status = 'Close';
          await chat.save();

          await LotModel.findByIdAndUpdate(chat.lot, {
            status: 'Archive'
          });

          await this.notificationGateWay.sendNotification({
            to: chat.users[0].toString(),
            notification: 'chatClosedByTimeout',
            lotId: chat.lot.toString(),
          });
          await this.notificationGateWay.sendNotification({
            to: chat.users[1].toString(),
            notification: 'chatClosedByTimeout',
            lotId: chat.lot.toString(),
          });

          console.log(`Chat ${chat._id} closed after 14 days without reviews`);
        } catch (error) {
          console.error('Chat cron error for chat', chat._id, error);
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
