"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./route/router"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/api', router_1.default);
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
