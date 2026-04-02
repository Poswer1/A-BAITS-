export declare class TransactionsService {
    create(lot: string, sum: number, user: string): Promise<{
        success: boolean;
    }>;
}
