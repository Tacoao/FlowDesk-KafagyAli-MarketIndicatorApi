// indicatorRequestController.ts
import { Request, Response } from 'express';
import { IndicatorRequestService } from '../service/indicatorRequestService'; 
import * as fs from 'fs';
interface ApiKeys {
    apiKeys: string[];
}
export class IndicatorRequestController {
    indicatorRequestService: IndicatorRequestService; 
    
    constructor(){
        this.indicatorRequestService = new IndicatorRequestService();
    }
   
    private verifyApiKey(apiKey: string): boolean {
        try {
            const jsonData: ApiKeys = JSON.parse(fs.readFileSync('./src/controller/apiKeys.json', 'utf-8'));
            return jsonData.apiKeys.includes(apiKey);
        } catch (error) {
            console.error('Erreur lors de la lecture du fichier JSON :', error);
            return false;
        }
    }

    controleIndicatorRequestKucoin = async (req: Request, res: Response) => {
        // Extract symbol from request parameters
        const symbol = req.params.symbol;
        const apiKey = req.headers['api-key'] as string|| req.query.apiKey as string;
        if (!this.verifyApiKey(apiKey)) {
            return res.status(401).json({ error: 'Invalid API key.' });
        }
        try{
            // Call the indicator request service to get indicator data
            const indicator = await this.indicatorRequestService.getIndicatorDataKucoin(symbol);
            // Send the retrieved indicator data as JSON response
            res.json(indicator);
        } catch(error){
            // Handle errors
            if (error instanceof Error) {
                // If it's a known error, send a 400 Bad Request response with the error message
                res.status(400).json({ error: error.message });
            } else {
                // If it's an unexpected error, send a 500 Internal Server Error response
                res.status(500).json({ error: "An unexpected error occurred." });
            }
        }
    }
}
