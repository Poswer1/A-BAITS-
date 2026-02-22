"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProccessImages = exports.ImagesInterceptor = void 0;
const multer_1 = require("multer");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const ImagesInterceptor = (destination) => {
    return {
        storage: (0, multer_1.diskStorage)({
            destination: destination,
            filename: (req, file, cb) => {
                const ext = path_1.default.extname(file.originalname);
                cb(null, Date.now() + ext);
            }
        })
    };
};
exports.ImagesInterceptor = ImagesInterceptor;
const ProccessImages = async (files) => {
    if (!files)
        return;
    await Promise.all(files.map(async (file) => {
        const parsedName = path_1.default.parse(file.filename).name;
        const webpName = `${parsedName}.webp`;
        const webpPath = path_1.default.join(file.destination, webpName);
        await (0, sharp_1.default)(file.path)
            .resize(600, 600, { fit: 'cover' })
            .webp({ quality: 80 })
            .toFile(webpPath);
        await fs_1.default.promises.unlink(file.path);
        file.filename = webpName;
    }));
    return files.map(file => `/uploads/lots/${file.filename}`);
};
exports.ProccessImages = ProccessImages;
//# sourceMappingURL=files-upload.js.map