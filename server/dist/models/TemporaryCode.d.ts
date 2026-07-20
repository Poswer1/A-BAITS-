import { Document, Types } from "mongoose";
export interface TempoparyCode {
    email: string;
    code: string;
}
export declare const TempoparyCode: import("mongoose").Model<TempoparyCode, {}, {}, {}, Document<unknown, {}, TempoparyCode, {}, import("mongoose").DefaultSchemaOptions> & TempoparyCode & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, TempoparyCode>;
