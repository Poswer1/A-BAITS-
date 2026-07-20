export declare const ImagesInterceptor: (destination: string) => {
    storage: import("multer").StorageEngine;
};
export declare const ProccessImages: (files: Express.Multer.File[], destination: string) => Promise<string[] | undefined>;
