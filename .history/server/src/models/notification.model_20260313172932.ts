import { model, Schema, Types} from "mongoose";


export interface NotificationType {
    to: string,
    from?: string,
    notification:string
    lot: Types.ObjectId
    read: boolean
}

const NotificationSchema = new Schema<NotificationType>({
    to: {type:String, required:true},
    from: {type:String},
    notification: {type:String, required:true},
    lot: {type:Schema.Types.ObjectId, ref: 'Lot'},
    read: {type: Boolean, default: false}
})

export const NotificationModel = model<NotificationType>('Notification', NotificationSchema)