import { Cryptocoin } from "@/types/CryptoTypes";
import { parseCryptocoin } from "@/types/TypeParser";

interface RetryConfig {
    maxRetries: number;
    baseDelay: number;
    maxDelay: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 10000,
};

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export class ApiService {
    private static instance: ApiService;
    private retryConfig: RetryConfig;

    constructor(retryConfig: RetryConfig = DEFAULT_RETRY_CONFIG) {
        this.retryConfig = retryConfig;
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    private async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private calculateBackoffDelay(attempt: number): number {
        const delay = this.retryConfig.baseDelay * Math.pow(2, attempt);
        return Math.min(delay, this.retryConfig.maxDelay);
    }

    private async makeRequest<T>(
        url: string,
        retriesLeft: number = this.retryConfig.maxRetries,
    ): Promise<T> {
        const response = await fetch(url);

        if (response.ok) {
            return response.json();
        } else {
            if (response.status === 429) {
                if (retriesLeft > 0) {
                    const delay = this.calculateBackoffDelay(retriesLeft - 1);
                    await this.delay(delay);
                    return this.makeRequest<T>(url, retriesLeft - 1);
                } else {
                    throw new Error('Rate limit exceeded');
                }
            } else if (response.status < 500 && response.status >= 400) {
                throw new Error('Bad request');
            } else if (response.status < 600 && response.status >= 500) {
                throw new Error('Server error');
            } else {
                throw new Error('Failed to fetch data');
            }
        }
    }

    public async getCoins(numCoins: number): Promise<Cryptocoin[]> {
        const url = `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${numCoins}&page=1&sparkline=false`;
        const data = await this.makeRequest<any[]>(url);
        return data.map((coin: any) => parseCryptocoin(coin));
    }
}

