"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotEvents = void 0;
const database_1 = require("firebase/database");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const getRandomFlower_1 = require("utils/getRandomFlower");
const regExp_1 = require("utils/regExp");
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
var BotEvents;
(function (BotEvents) {
    const TIMEZONE = 'Europe/Madrid';
    const DATE_FORMAT = 'DDMMYYYY';
    BotEvents.incrementUserJolines = async (database, channel, username) => {
        try {
            const userKey = username.toLowerCase();
            const date = (0, dayjs_1.default)().tz(TIMEZONE).format(DATE_FORMAT);
            const jolinesRef = (0, database_1.ref)(database, `${channel}/jolines`);
            const usersRef = (0, database_1.ref)(database, `${channel}/jolines/users`);
            const datesTotalRef = (0, database_1.ref)(database, `${channel}/jolines/dates/${date}`);
            const datesUsersRef = (0, database_1.ref)(database, `${channel}/jolines/dates/${date}/users`);
            await (0, database_1.update)(jolinesRef, { total: (0, database_1.increment)(1) });
            await (0, database_1.update)(datesTotalRef, { total: (0, database_1.increment)(1) });
            await (0, database_1.update)(usersRef, { [userKey]: (0, database_1.increment)(1) });
            await (0, database_1.update)(datesUsersRef, { [userKey]: (0, database_1.increment)(1) });
        }
        catch (error) {
            throw error;
        }
    };
    BotEvents.getJolines = async (database, channel, username) => {
        try {
            if (username) {
                const jolinesRef = (0, database_1.ref)(database, `${channel}/jolines/users/${username}`);
                const jolinesSnapshot = await (0, database_1.get)(jolinesRef);
                return jolinesSnapshot.val();
            }
            const jolinesRef = (0, database_1.ref)(database, `${channel}/jolines/total`);
            const jolinesSnapshot = await (0, database_1.get)(jolinesRef);
            return jolinesSnapshot.val();
        }
        catch (error) {
            throw error;
        }
    };
    BotEvents.onMessage = (bot, database) => async (channel, ctx, message, self) => {
        try {
            if (self)
                return;
            const cleanedChannel = channel.replace('#', '');
            const cleanedMessage = message.trim().toLowerCase();
            if (cleanedMessage === '!jolines') {
                const jolines = await BotEvents.getJolines(database, cleanedChannel);
                bot.say(channel, `Llevamos ${jolines} jolines ${(0, getRandomFlower_1.getRandomFlower)()}!`);
            }
            else if (regExp_1.RegExp.jolinesUser.test(cleanedMessage)) {
                const username = cleanedMessage.split(' ')[1].replace('@', '');
                const jolines = await BotEvents.getJolines(database, cleanedChannel, username);
                if (!jolines)
                    return bot.say(channel, `@${username} no tiene jolines :c`);
                bot.say(channel, `@${username} lleva ${jolines} jolines ${(0, getRandomFlower_1.getRandomFlower)()}!`);
            }
            else if (cleanedMessage.includes('jolin') && !cleanedMessage.includes('jolines')) {
                await BotEvents.incrementUserJolines(database, cleanedChannel, ctx.username);
            }
        }
        catch (error) {
            throw error;
        }
    };
})(BotEvents = exports.BotEvents || (exports.BotEvents = {}));
//# sourceMappingURL=bot.events.js.map