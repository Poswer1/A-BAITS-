import { LotService } from './lot.service';
import { filterLot, LotDto } from './dto/lot.dto';
export declare class LotController {
    private readonly lotService;
    constructor(lotService: LotService);
    createLot(req: any, dto: LotDto, files: Express.Multer.File[]): Promise<import("mongoose").Document<unknown, {}, import("../../models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/lot.model").Lot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllLot(): Promise<(import("mongoose").Document<unknown, {}, import("../../models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/lot.model").Lot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getFilterLot(query: filterLot): Promise<{
        lots: (import("mongoose").Document<unknown, {}, import("../../models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/lot.model").Lot & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        totalLot: number;
        maxPriceLot: number;
    }>;
    getLot(numberLot: string): Promise<(import("mongoose").Document<unknown, {}, import("../../models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/lot.model").Lot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    myHistoryLot(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../../models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/lot.model").Lot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[] | undefined>;
}
