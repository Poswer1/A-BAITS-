import { model, ObjectId, Schema, Types} from "mongoose";


interface notification {
    to: string,
    from: string,
    notification:string
    lot: Types.ObjectId
}

const NotificationSchema = new Schema<notification>({
    to: {type:String, required:true},
    from: {type:String, required:true},
    notification: {type:String, required:true},
    lot: {type:Schema.Types.ObjectId, ref: 'Lot' required:true},
})

export const NotificationModel = 