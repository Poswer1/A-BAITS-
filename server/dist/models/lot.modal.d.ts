export interface Lot {
    name: string;
    startPrice: number;
    stepPrice: number;
    blitzPrice?: number;
    reservPrice?: number;
    img: string[];
    autoReExtension: boolean;
    descriptions: string;
    state: string;
    date: Date;
    dateTime: number;
    location: string;
    delivary: string;
    Advertising: boolean;
}
export declare const LotModel: import("mongoose").Model<Lot, {}, {}, {}, import("mongoose").Document<unknown, {}, Lot, {}, import("mongoose").DefaultSchemaOptions> & Lot & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Lot>;
