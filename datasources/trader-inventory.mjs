import WorkerKV from '../utils/worker-kv.mjs';

class TraderInventoryAPI extends WorkerKV {
    constructor(dataSource) {
        super('trader_price_data', dataSource);
        this.traderCache = {};
        //this.gameModes.push('pve');
    }

    async getTraderCache(context, info) {
        const { cache, gameMode } = await this.getCache(context, info);
        if (this.traderCache[gameMode]) {
            return {cache: this.traderCache[gameMode], gameMode};
        }

        try {
            const traderCache = {};
            for (const itemOffers of Object.values(cache.TraderCashOffer)) {
                for (const offer of itemOffers) {
                    if (!traderCache[offer.vendor.trader_id]) traderCache[offer.vendor.trader_id] = [];
                    traderCache[offer.vendor.trader_id].push(offer);
                }
            }
            this.traderCache[gameMode] = traderCache;
        } catch (error) {
            return Promise.reject(error);
        }
        return {cache: this.traderCache[gameMode], gameMode};
    }

    async getByItemId(context, info, itemId) {
        const { cache } = await this.getCache(context, info);
        return cache.TraderCashOffer[itemId] ?? [];
    }

    async getPricesForTrader(context, info, traderId) {
        const { cache } = await this.getTraderCache(context, info);
        return cache[traderId] ?? [];
    }

    async getPricesForTraderLevel(context, info, traderId, level) {
        const traderPrices = await this.getPricesForTrader(context, info, traderId);
        return traderPrices.filter(offer => {
            return offer.vendor.traderLevel === level;
        });
    }
}

export default TraderInventoryAPI;
