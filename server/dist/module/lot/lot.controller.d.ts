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
    viewsCount(id: string, userId: string): Promise<void>;
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
    getTopLot(): Promise<any[]>;
    getNewLot(): Promise<any[]>;
    getLotFrom1UAH(): Promise<any[]>;
    getPopularLot(): Promise<any[]>;
    closeLot(id: string): Promise<{
        status: string;
    }>;
    deleteLot(id: string): Promise<{
        success: boolean;
    }>;
    resumeLot(id: string): Promise<{
        success: boolean;
    }>;
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
