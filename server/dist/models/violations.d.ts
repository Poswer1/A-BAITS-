import { Document, Types } from "mongoose";
export interface Violations {
    violations: string;
    lot: Types.ObjectId;
    user: Types.ObjectId;
    repeated: number;
}
export declare const ViolationsModel: import("mongoose").Model<Violations, {}, {}, {}, Document<unknown, {}, Violations, {}, import("mongoose").DefaultSchemaOptions> & Violations & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Violations>;
