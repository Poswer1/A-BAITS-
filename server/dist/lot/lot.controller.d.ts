import { LotService } from './lot.service';
import { LotDto } from './dto/lot.dto';
export declare class LotController {
    private readonly lotService;
    constructor(lotService: LotService);
    createLot(dto: LotDto): Promise<import("mongoose").Document<unknown, {}, import("../models/lot.model").Lot, {}, import("mongoose").DefaultSchemaOptions> & import("../models/lot.model").Lot & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
