import { model, ObjectId, Schema, Types} from "mongoose";
import { ref } from "process";

interface notification {
    to: string,
    from: string,
    notification:string
}

const NotificationSchema = new Schema<notification>({
    to: {type:String, required:true},
    from: {type:String, required:true},
    notification: {type:String, required:true},
    lot: {type:Types.ObjectId, ref: 'Lot' required:true},
})