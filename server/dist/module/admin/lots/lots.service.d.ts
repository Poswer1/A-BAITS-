export declare class LotsService {
    getDateRanges(): {
        dateDay: Date;
        dateWeek: Date;
        dateMonth: Date;
    };
    getLotsBySearch(search: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getLotsCount(): Promise<any>;
    getAllTurnover(): Promise<any>;
}
