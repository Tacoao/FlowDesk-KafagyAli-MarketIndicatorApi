"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorRequestService = void 0;
const axios_1 = __importDefault(require("axios"));
class IndicatorRequestService {
    getIndicatorDataKucoin(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            let indicator = 0.0;
            try {
                const response = yield axios_1.default.get(`https://api.kucoin.com/api/v1/market/histories?symbol=${symbol}`);
                if (response.data.data.length === 0) {
                    // Throw an error if the trading pair symbol doesn't exist
                    throw new Error("The trading pair symbol does not exist");
                }
                const data = response.data.data;
                data.forEach((order) => {
                    if (order.side === "buy") {
                        // Increase the indicator if it's a buy order
                        indicator += parseFloat(order.size);
                    }
                    if (order.side === "sell") {
                        // Decrease the indicator if it's a sell order
                        indicator -= parseFloat(order.size);
                    }
                });
                return indicator;
            }
            catch (error) {
                // Log and rethrow the error if any occurs
                console.error("An error occurred while retrieving the data:", error);
                throw error;
            }
        });
    }
}
exports.IndicatorRequestService = IndicatorRequestService;
