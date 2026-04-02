import { LotService } from './lot.service';
import { filterLot, getMyLotsDto, LotDto } from './dto/lot.dto';
import type { Request } from 'express';
export declare class LotController {
    private readonly lotService;
    constructor(lotService: LotService);
    createLot(dto: LotDto, files: Express.Multer.File[], userId: string): Promise<import("mongoose").Document<unknown, {}, import("../../models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/lot.model").Lot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateLot(req: Request, preview: string, dto: LotDto, id: string, files: Express.Multer.File[], userId: string): Promise<{
        success: boolean;
    }>;
    getAllLot(): Promise<(import("mongoose").Document<unknown, {}, import("../../models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/lot.model").Lot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getLotByUser(query: {
        name: string;
        page: number;
    }): Promise<{
        allLots: (import("mongoose").Document<unknown, {}, import("../../models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/lot.model").Lot & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        totalLots: number;
    } | undefined>;
    getMyLots(query: getMyLotsDto, userId: string): Promise<{
        allLots: (import("mongoose").Document<unknown, {}, import("../../models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/lot.model").Lot & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        totalLot: number;
    }>;
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
