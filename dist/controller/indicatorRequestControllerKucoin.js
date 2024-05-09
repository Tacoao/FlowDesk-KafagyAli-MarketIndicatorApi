"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorRequestController = void 0;
const indicatorRequestServiceKucoin_1 = require("../service/indicatorRequestServiceKucoin");
const fs = __importStar(require("fs"));
class IndicatorRequestController {
    constructor() {
        this.controleIndicatorRequestKucoin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // Extract symbol from request parameters
            const symbol = req.params.symbol;
            const apiKey = req.headers['api-key'] || req.query.apiKey;
            if (!this.verifyApiKey(apiKey)) {
                return res.status(401).json({ error: 'Invalid API key.' });
            }
            try {
                // Call the indicator request service to get indicator data
                const indicator = yield this.indicatorRequestService.getIndicatorDataKucoin(symbol);
                // Send the retrieved indicator data as JSON response
                res.json(indicator);
            }
            catch (error) {
                // Handle errors
                if (error instanceof Error) {
                    // If it's a known error, send a 400 Bad Request response with the error message
                    res.status(400).json({ error: error.message });
                }
                else {
                    // If it's an unexpected error, send a 500 Internal Server Error response
                    res.status(500).json({ error: "An unexpected error occurred." });
                }
            }
        });
        this.indicatorRequestService = new indicatorRequestServiceKucoin_1.IndicatorRequestService();
    }
    verifyApiKey(apiKey) {
        try {
            // Charger le fichier JSON contenant les clés API
            const jsonData = JSON.parse(fs.readFileSync('controller/apiKeys.json', 'utf-8'));
            // Vérifier si la clé API est présente dans le tableau
            return jsonData.apiKeys.includes(apiKey);
        }
        catch (error) {
            console.error('Erreur lors de la lecture du fichier JSON :', error);
            return false;
        }
    }
}
exports.IndicatorRequestController = IndicatorRequestController;
