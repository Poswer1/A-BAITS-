export declare class ViolationsService {
    newViolations(user: string, violations: string, lot?: string): Promise<{
        plusRepeated: boolean;
        success?: undefined;
    } | {
        success: boolean;
        plusRepeated?: undefined;
    }>;
    getAllViolations(): Promise<(import("mongoose").Document<unknown, {}, import("src/models/violations").Violations, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/violations").Violations & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
