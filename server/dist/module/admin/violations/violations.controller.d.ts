import { ViolationsService } from './violations.service';
export declare class ViolationsController {
    private readonly violationsService;
    constructor(violationsService: ViolationsService);
    getAllViolations(): Promise<(import("mongoose").Document<unknown, {}, import("../../../models/violations").Violations, {}, import("mongoose").DefaultSchemaOptions> & import("../../../models/violations").Violations & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
