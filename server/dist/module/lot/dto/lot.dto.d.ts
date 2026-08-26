export declare class LotDto {
    name: string;
    startPrice: number;
    category: string;
    subCategory: string;
    subSubCategory?: string;
    stepPrice: number;
    blitzPrice?: number;
    reservPrice?: number;
    autoReExtension?: boolean;
    descriptions: string;
    state: string;
    date?: number;
    dateTime?: string;
    location: string;
    delivary: string[];
    Advertising?: boolean;
}
export declare class getMyLotsDto {
    status: string;
    mode: string;
    page?: number;
    sort?: string;
}
export declare class filterLot {
    category?: string;
    subCategory?: string;
    subSubCategory?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    state?: string[];
    sort?: string;
    page: number;
    search?: string;
}
