 import { Schema, model, Document,Types } from "mongoose";

export interface Violations {
    violations: string,
    lot: Types.ObjectId
    user: Types.ObjectId
    repeated: number
}

const ViolationsSchema = new Schema<Violations>(
    {
        violations: {type: String, required:true},
        lot: {type: Schema.Types.ObjectId, ref: "Lot", required: true},
        user: {type: Schema.Types.ObjectId, ref: "User", required: true}
        
    }
)