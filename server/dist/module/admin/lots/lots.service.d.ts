export declare class LotsService {
    getDateRanges(): {
        dateDay: Date;
        dateWeek: Date;
        dateMonth: Date;
    };
    getLotsBySearch(search?: string, page?: number, sort?: string, order?: string, status?: string): Promise<{
        lots: (import("mongoose").Document<unknown, {}, import("src/models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
    }>;
    getLotsCount(): Promise<any>;
    getAllTurnover(): Promise<any>;
}
