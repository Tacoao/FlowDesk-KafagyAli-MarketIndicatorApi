import { IndicatorRequestService } from '../src/service/indicatorRequestService';
import axios from 'axios';

jest.mock('axios');

describe('IndicatorRequestService', () => {
    it('should return the correct indicator value', async () => {
        const mockData = {
            data: [
                {
                    sequence: "7582035645585427",
                    price: "0.04840",
                    size: "0.0016219",
                    side: "sell",
                    time: 1715269411352000000
                },
                {
                    sequence: "7582035645585430",
                    price: "0.04840",
                    size: "0.0003522",
                    side: "sell",
                    time: 1715269411352000000
                },
                {
                    sequence: "7582035645585433",
                    price: "0.04840",
                    size: "0.0015326",
                    side: "sell",
                    time: 1715269411352000000
                },
            ]
        };
        // Mock the axios.get method to return mockData
        (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

        const indicatorService = new IndicatorRequestService();
        const indicator = await indicatorService.getIndicatorDataKucoin('BTC-USDT');
        // Calculate the expected indicator value based on the mock data
        const expectedIndicator = (-0.0016219) + (-0.0003522) + (-0.0015326); 

        expect(indicator).toBe(expectedIndicator);
    });

    it('should throw an error if the trading pair symbol does not exist', async () => {
        // Mock the axios.get method to return an empty data array
        (axios.get as jest.Mock).mockResolvedValue({ data: { data: [] } });

        const indicatorService = new IndicatorRequestService();
        await expect(indicatorService.getIndicatorDataKucoin('BTC-ETH')).rejects.toThrow('The trading pair symbol does not exist');
    });

});
