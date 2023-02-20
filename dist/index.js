"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
require("module-alias/register");
const tmi_js_1 = __importDefault(require("tmi.js"));
const Bot_1 = require("config/Bot");
const Firebase_1 = require("config/Firebase");
const bot_1 = require("handlers/bot");
const launch = async () => {
    try {
        const options = await Bot_1.Bot.createBotOptions();
        const bot = new tmi_js_1.default.Client(options);
        const firebase = new Firebase_1.Firebase();
        bot.on('connected', () => console.log('[+] Bot connected'));
        bot.on('message', bot_1.BotEvents.onMessage(bot, firebase.database));
        bot.connect();
    }
    catch (error) {
        console.error(error);
    }
};
launch();
//# sourceMappingURL=index.js.map