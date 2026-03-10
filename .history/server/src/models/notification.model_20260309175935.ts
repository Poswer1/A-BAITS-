import { model,  Schema, Types} from "mongoose";


interface NotificationType {
    to: string,
    from: string,
    notification:string
    lot: Types.ObjectId
}

const NotificationSchema = new Schema<NotificationType>({
    to: {type:String, required:true},
    from: {type:String, required:true},
    notification: {type:String, required:true},
    lot: {type:Schema.Types.ObjectId, ref: 'Lot'},
})

export const NotificationModel = model<NotificationType>('Notification', NotificationSchema)