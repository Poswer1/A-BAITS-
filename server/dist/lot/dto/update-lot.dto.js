"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLotDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_lot_dto_1 = require("./create-lot.dto");
class UpdateLotDto extends (0, mapped_types_1.PartialType)(create_lot_dto_1.CreateLotDto) {
}
exports.UpdateLotDto = UpdateLotDto;
//# sourceMappingURL=update-lot.dto.js.map