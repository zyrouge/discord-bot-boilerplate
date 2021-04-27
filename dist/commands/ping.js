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
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("@/base/plugins/commands");
const util_1 = require("@/util");
const fn = (app) => {
    const command = new commands_1.Command({
        name: "ping",
        description: "Sends bot's response time",
        aliases: ["pong"],
        category: "misc",
    }, ({ msg }) => __awaiter(void 0, void 0, void 0, function* () {
        const start = Date.now();
        const nmsg = yield msg.channel.createMessage(`${util_1.Emojis.TIMER} | Pinging...`);
        nmsg.edit(`${util_1.Emojis.PING_PONG} | Pong! It took ${nmsg.createdAt - msg.createdAt}ms to respond and ${Date.now() - start}ms to process!`);
    }));
    app.commands.add(command);
};
exports.default = fn;
