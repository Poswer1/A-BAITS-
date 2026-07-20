import { Document, Types } from "mongoose";
export interface Loagging {
    user: Types.ObjectId;
    action: string;
    lot?: Types.ObjectId;
}
export declare const LoaggingModel: import("mongoose").Model<Loagging, {}, {}, {}, Document<unknown, {}, Loagging, {}, import("mongoose").DefaultSchemaOptions> & Loagging & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Loagging>;
