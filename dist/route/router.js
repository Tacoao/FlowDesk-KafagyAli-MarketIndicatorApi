"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indicatorRequestController_1 = require("../controller/indicatorRequestController");
const router = express_1.default.Router();
const indicatorController = new indicatorRequestController_1.IndicatorRequestController();
router.get('/indicatorKucoin/:symbol', indicatorController.controleIndicatorRequestKucoin);
exports.default = router;
