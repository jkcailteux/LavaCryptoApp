import { ApiService } from '@/service/ApiService';
import { Cryptocoin } from '@/types/CryptoTypes';
import { create } from 'zustand';

interface CryptoStore {
    coins: Cryptocoin[];
    isLoading: boolean;
    error: string | null;
    fetchCoins: () => Promise<void>;
    setCoins: (coins: Cryptocoin[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useCryptoStore = create<CryptoStore>((set, get) => ({
    coins: [],
    isLoading: false,
    error: null,

    fetchCoins: async () => {
        set({ isLoading: true, error: null });
        try {
            const coins = await ApiService.getInstance().getCoins();
            set({ coins, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch coins',
                isLoading: false
            });
        }
    },

    setCoins: (coins) => set({ coins }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
})); 