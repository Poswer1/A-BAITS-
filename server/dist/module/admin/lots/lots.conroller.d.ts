import { LotsService } from "./lots.service";
export declare class LotsController {
    private readonly lotsService;
    constructor(lotsService: LotsService);
    getLotsBySearch(search: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("../../../models/lot.model").Lot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getLotsCount(): Promise<any>;
    getAllTurnover(): Promise<any>;
}
