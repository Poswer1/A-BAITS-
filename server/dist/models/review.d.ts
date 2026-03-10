import { Types } from "mongoose";
export interface ReviewType {
    to: Types.ObjectId;
    from: Types.ObjectId;
    comment: string;
    rating: number;
}
export declare const ReviewModel: import("mongoose").Model<ReviewType, {}, {}, {}, import("mongoose").Document<unknown, {}, ReviewType, {}, import("mongoose").DefaultSchemaOptions> & ReviewType & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, ReviewType>;
