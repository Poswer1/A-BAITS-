"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProccessImages = exports.ImagesInterceptor = void 0;
const multer_1 = require("multer");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
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
const ProccessImages = async (files, destination) => {
    if (!files)
        return;
    await Promise.all(files.map(async (file) => {
        const parsedName = path_1.default.parse(file.filename).name;
        const newName = `${parsedName}-${Math.round(Math.random() * 1e6)}`;
        const webpName = `${newName}.webp`;
        const finalPath = path_1.default.join(file.destination, webpName);
        await (0, sharp_1.default)(file.path)
            .resize(600, 600, { fit: 'cover' })
            .webp({ quality: 80 })
            .toFile(finalPath);
        await promises_1.default.unlink(file.path);
        file.filename = webpName;
    }));
    return files.map(file => `${destination}${file.filename}`);
};
exports.ProccessImages = ProccessImages;
//# sourceMappingURL=files-upload.js.map