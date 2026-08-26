import { filterLot, getMyLotsDto, LotDto } from './dto/lot.dto';
import mongoose, { Types } from 'mongoose';
import { ViolationsService } from '../admin/violations/violations.service';
import { FinanceService } from '../admin/finance/finance.service';
import { LoggingService } from '../admin/logging/logging.service';
import { PaymentService } from '../payment/payment.service';
export declare class LotService {
    private readonly violationsService;
    private readonly financeService;
    private readonly loggingService;
    private readonly paymentService;
    constructor(violationsService: ViolationsService, financeService: FinanceService, loggingService: LoggingService, paymentService: PaymentService);
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
    resumeLot(id: string, userId: string): Promise<{
        success: boolean;
    }>;
    deleteLot(id: string, role: string): Promise<{
        success: boolean;
    }>;
    updateLot(dto: LotDto, id: string, files: Express.Multer.File[], preview: string[], userId: string, role: string): Promise<{
        success: boolean;
    }>;
    viewsCount(id: string, userId: string): Promise<{
        success: boolean;
    }>;
    getAllLot(): Promise<(mongoose.Document<unknown, {}, import("src/models/lot.model").Lot, {}, mongoose.DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getCategoryStats(): Promise<Record<string, {
        count: number;
        subcategories: Record<string, {
            count: number;
            subSubcategories: Record<string, number>;
        }>;
    }>>;
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
    getMyAutoBid(numberLot: string, userId: string): Promise<{
        max: number | null;
    }>;
    myHistoryLot(userId: string): Promise<(mongoose.Document<unknown, {}, import("src/models/lot.model").Lot, {}, mongoose.DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[] | undefined>;
    autoBid(data: {
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
    calculateAuctionState(lots: any[], userId: string, bid: number, stepPrice: number, startPrice: number, mode: 'bid' | 'autoBid'): Promise<{
        authorBid: any;
        newPrice: number;
    }>;
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
