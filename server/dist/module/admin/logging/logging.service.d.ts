export declare class LoggingService {
    newLog(userId: string, action: string, lot?: string): Promise<{
        success: boolean;
    }>;
    getAllLogs(): Promise<(import("mongoose").Document<unknown, {}, import("src/models/logging").Loagging, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/logging").Loagging & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
