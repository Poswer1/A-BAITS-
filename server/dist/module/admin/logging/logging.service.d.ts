export declare class LoggingService {
    newLog(userId: string, action: string, lot?: string): Promise<{
        success: boolean;
    }>;
    getAllLogs(page?: number, sort?: string, order?: string): Promise<{
        logs: (import("mongoose").Document<unknown, {}, import("src/models/logging").Loagging, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/logging").Loagging & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
    }>;
}
