import { Cryptocoin } from "./CryptoTypes";


export function parseCryptocoin(rawCoin: any): Cryptocoin {
    try {
        return {
            id: rawCoin.id,
            symbol: rawCoin.symbol,
            name: rawCoin.name,
            image: rawCoin.image,
            currentPrice: rawCoin.current_price,
            marketCap: rawCoin.market_cap,
            marketCapRank: rawCoin.market_cap_rank,
            fullyDilutedValuation: rawCoin.fully_diluted_valuation,
            totalVolume: rawCoin.total_volume,
            high24h: rawCoin.high_24h,
            low24h: rawCoin.low_24h,
            priceChange24h: rawCoin.price_change_24h,
            priceChangePercentage24h: rawCoin.price_change_percentage_24h,
            marketCapChange24h: rawCoin.market_cap_change_24h,
            marketCapChangePercentage24h: rawCoin.market_cap_change_percentage_24h,
            circulatingSupply: rawCoin.circulating_supply,
            totalSupply: rawCoin.total_supply,
            maxSupply: rawCoin.max_supply,
            ath: rawCoin.ath,
            athChangePercentage: rawCoin.ath_change_percentage,
            athDate: rawCoin.ath_date,
            atl: rawCoin.atl,
            atlChangePercentage: rawCoin.atl_change_percentage,
            atlDate: rawCoin.atl_date,
            roi: rawCoin.roi,
            lastUpdated: rawCoin.last_updated,
        }
    } catch (error) {
        console.error('Error parsing cryptocoin', error);
        throw error;
    }
}