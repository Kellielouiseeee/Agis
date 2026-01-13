"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const game_1 = __importDefault(require("./routes/game"));
const rewards_1 = __importDefault(require("./routes/rewards"));
const status_1 = __importDefault(require("./routes/status"));
// initialize environment and services
dotenv_1.default.config();
require("./services/contractService");
require("./workers/txWorker");
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/auth', auth_1.default);
app.use('/game', game_1.default);
app.use('/rewards', rewards_1.default);
app.use('/status', status_1.default);
app.get('/', (_req, res) => res.json({ service: 'agis-backend', status: 'ok' }));
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
app.listen(PORT, () => {
    console.log(`AGIS backend listening on http://localhost:${PORT}`);
});
exports.default = app;
