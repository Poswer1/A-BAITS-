import { filterLot, getMyLotsDto, LotDto } from './dto/lot.dto';
import mongoose, { Types } from 'mongoose';
import { ViolationsService } from '../admin/violations/violations.service';
import { FinanceService } from '../admin/finance/finance.service';
import { LoggingService } from '../admin/logging/logging.service';
export declare class LotService {
    private readonly violationsService;
    private readonly financeService;
    private readonly loggingService;
    constructor(violationsService: ViolationsService, financeService: FinanceService, loggingService: LoggingService);
    createLot(dto: LotDto, files: Express.Multer.File[], userId: string): Promise<mongoose.Document<unknown, {}, import("src/models/lot.model").Lot, {}, mongoose.DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    closeLot(id: string): Promise<{
        status: string;
    }>;
    resumeLot(id: string): Promise<{
        success: boolean;
    }>;
    deleteLot(id: string): Promise<{
        success: boolean;
    }>;
    updateLot(dto: LotDto, id: string, files: Express.Multer.File[], preview: string[], userId: string, role: string): Promise<{
        success: boolean;
    }>;
    viewsCount(id: string, userId: string): Promise<void>;
    getAllLot(): Promise<(mongoose.Document<unknown, {}, import("src/models/lot.model").Lot, {}, mongoose.DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getTopLot(): Promise<any[]>;
    getLotFrom1UAH(): Promise<any[]>;
    getNewLot(): Promise<any[]>;
    getPopularLot(): Promise<any[]>;
    getLotByUser(query: {
        name: string;
        page: number;
    }): Promise<{
        allLots: (mongoose.Document<unknown, {}, import("src/models/lot.model").Lot, {}, mongoose.DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        totalLots: number;
    } | undefined>;
    getMyLots(query: getMyLotsDto, userId: string): Promise<{
        allLots: (mongoose.Document<unknown, {}, import("src/models/lot.model").Lot, {}, mongoose.DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        totalLot: number;
    }>;
    getFilterLot(query: filterLot): Promise<{
        lots: (mongoose.Document<unknown, {}, import("src/models/lot.model").Lot, {}, mongoose.DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        totalLot: number;
        maxPriceLot: number;
    }>;
    getLot(numberLot: string): Promise<(mongoose.Document<unknown, {}, import("src/models/lot.model").Lot, {}, mongoose.DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    myHistoryLot(userId: string): Promise<(mongoose.Document<unknown, {}, import("src/models/lot.model").Lot, {}, mongoose.DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[] | undefined>;
    placeBid(data: {
        lotId: string;
        bid: number;
    }, userId: string): Promise<{
        lotId: string;
        newPrice: number;
        lastBid: {
            authorId: any;
            name: any;
            avatar: any;
            currentBid: number;
            dateBid: Date | undefined;
        };
    } | null>;
    getHistoryBid(lotId: string): Promise<{
        historyUser: {
            authorId: Types.ObjectId;
            name: any;
            avatar: any;
            currentBid: number;
            dateBid: Date | undefined;
        }[];
    }>;
}
