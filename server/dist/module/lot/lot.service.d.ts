import { LotDto } from './dto/lot.dto';
import { Types } from 'mongoose';
export declare class LotService {
    createLot(dto: LotDto, files: Express.Multer.File[], userId: string): Promise<import("mongoose").Document<unknown, {}, import("src/models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllLot(): Promise<(import("mongoose").Document<unknown, {}, import("src/models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getLot(numberLot: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    myHistoryLot(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
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
    } | null | undefined>;
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
