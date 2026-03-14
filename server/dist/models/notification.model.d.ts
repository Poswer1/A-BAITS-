import { Types } from "mongoose";
export interface NotificationType {
    to: string;
    from?: string;
    notification: string;
    lot: Types.ObjectId;
    read: boolean;
}
export declare const NotificationModel: import("mongoose").Model<NotificationType, {}, {}, {}, import("mongoose").Document<unknown, {}, NotificationType, {}, import("mongoose").DefaultSchemaOptions> & NotificationType & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, NotificationType>;
