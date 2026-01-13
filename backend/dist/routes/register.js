"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.registerRouter = router;
router.post('/', async (req, res) => {
    const { username } = req.body;
    if (!username)
        return res.status(400).json({ error: 'username required' });
    // minimal: return a user id
    return res.json({ id: `user_${Date.now()}`, username });
});
