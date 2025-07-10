import { Cryptocoin } from "@/types/CryptoTypes";
import { parseCryptocoin } from "@/types/TypeParser";


export class ApiService {
    private static instance: ApiService;

    constructor() { }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    public async getCoins(numCoins: number): Promise<Cryptocoin[]> {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${numCoins}&page=1&sparkline=false`);
        if (response.ok) {
            const data = await response.json();
            return data.map((coin: any) => parseCryptocoin(coin));
        } else {
            if (response.status === 429) {
                // TODO lets add retry logic
                throw new Error('Rate limit exceeded');
            } else if (response.status < 500 && response.status >= 400) {
                throw new Error('Bad request');
            } else if (response.status < 600 && response.status >= 500) {
                throw new Error('Server error');
            } else {
                throw new Error('Failed to fetch coins');
            }
        }
    }
}

