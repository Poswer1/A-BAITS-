import { Types } from 'mongoose';
export declare class NotificationService {
    getHistoryNotification(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/notification.model").NotificationType, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/notification.model").NotificationType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    read(userId: string): Promise<void>;
    checkRead(userId: string): Promise<boolean>;
    removeChatNotifications(to: string, lotId: string): Promise<void>;
    createNotification(to: string, notification: string, lotId: string, from?: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/notification.model").NotificationType, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/notification.model").NotificationType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null | undefined>;
}
