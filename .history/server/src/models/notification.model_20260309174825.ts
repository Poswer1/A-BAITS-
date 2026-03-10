import { model, ObjectId, Schema, Types} from "mongoose";

interface notification {
    to: string,
    from: string,
    notification:string
}

const NotificationSchema = new Schema<notification>({
    to: {type:String, required:true},
    
})