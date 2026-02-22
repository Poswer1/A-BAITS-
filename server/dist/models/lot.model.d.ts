import { Types } from "mongoose";
interface HistoryBid {
    author: Types.ObjectId;
    currentBid: number;
    createdAt?: Date;
}
export interface Lot {
    name: string;
    author: Types.ObjectId;
    lotNumber: string;
    category: string;
    subCategory: string;
    subSubCategory?: string;
    startPrice: number;
    stepPrice: number;
    blitzPrice?: number;
    reservPrice?: number;
    images: string[];
    autoReExtension: boolean;
    descriptions: string;
    state: string;
    date: number;
    dateTime: string;
    location: string;
    status: string;
    delivary: string;
    Advertising: boolean;
    historyBid: HistoryBid[];
}
export declare const LotModel: import("mongoose").Model<Lot, {}, {}, {}, import("mongoose").Document<unknown, {}, Lot, {}, import("mongoose").DefaultSchemaOptions> & Lot & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Lot>;
export {};
