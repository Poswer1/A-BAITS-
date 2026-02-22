import { LotDto } from './dto/lot.dto';
export declare class LotService {
    createLot(dto: LotDto): Promise<import("mongoose").Document<unknown, {}, import("src/models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/lot.model").Lot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
