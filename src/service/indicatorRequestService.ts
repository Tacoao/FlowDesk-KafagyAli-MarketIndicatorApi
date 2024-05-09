import axios from 'axios';

export class IndicatorRequestService{
    async getIndicatorDataKucoin(symbol: string): Promise<number> {
        let indicator = 0.0; 
        try {
            const response = await axios.get(`https://api.kucoin.com/api/v1/market/histories?symbol=${symbol}`);
            if (response.data.data.length === 0) {
                // Throw an error if the trading pair symbol doesn't exist
                throw new Error("The trading pair symbol does not exist");
            }
            const data = response.data.data;
            data.forEach((order: any) => {
                if (order.side === "buy") {
                    // Increase the indicator if it's a buy order
                    indicator += parseFloat(order.size); 
                }
                else if (order.side === "sell") {
                    // Decrease the indicator if it's a sell order
                    indicator -= parseFloat(order.size); 
                }
            });
            return indicator;
        } catch (error) {
            // Log and rethrow the error if any occurs
            console.error("An error occurred while retrieving the data:", error);
            throw error; 
        }
    }
    
}