import { model, ObjectId, Schema, Types} from "mongoose";

interface notification {
    to: string,
    from: string,
    notification:string
}