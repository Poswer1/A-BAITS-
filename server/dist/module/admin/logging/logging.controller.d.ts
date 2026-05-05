import { LoggingService } from './logging.service';
export declare class LoggingController {
    private readonly loggingService;
    constructor(loggingService: LoggingService);
    getAllLogs(page?: number, sort?: string, order?: string): Promise<{
        logs: (import("mongoose").Document<unknown, {}, import("../../../models/logging").Loagging, {}, import("mongoose").DefaultSchemaOptions> & import("../../../models/logging").Loagging & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
    }>;
}
