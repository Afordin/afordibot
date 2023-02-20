"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const axios_1 = __importDefault(require("axios"));
var Bot;
(function (Bot) {
    Bot.BOT_ID = process.env.BOT_ID;
    Bot.BOT_SECRET = process.env.BOT_SECRET;
    Bot.BOT_CODE = process.env.BOT_CODE;
    Bot.BOT_USERNAME = process.env.BOT_USERNAME;
    Bot.BOT_CHANNELS = process.env.BOT_CHANNELS.split(' ');
    Bot.TOKEN_ENDPOINT = process.env.TOKEN_ENDPOINT;
    Bot.GRANT_TYPE = 'authorization_code';
    Bot.REDIRECT_URI = 'http://localhost';
    Bot.getAccessToken = async () => {
        try {
            const { data } = await (0, axios_1.default)({
                method: 'POST',
                url: Bot.TOKEN_ENDPOINT,
                params: {
                    client_id: Bot.BOT_ID,
                    client_secret: Bot.BOT_SECRET,
                    code: Bot.BOT_CODE,
                    grant_type: Bot.GRANT_TYPE,
                    redirect_uri: Bot.REDIRECT_URI,
                },
            });
            return data;
        }
        catch (error) {
            throw error;
        }
    };
    Bot.createBotOptions = async () => {
        const { access_token } = await Bot.getAccessToken();
        return {
            identity: {
                username: Bot.BOT_USERNAME,
                password: `oauth:${access_token}`,
            },
            channels: Bot.BOT_CHANNELS,
        };
    };
})(Bot = exports.Bot || (exports.Bot = {}));
//# sourceMappingURL=Bot.module.js.map