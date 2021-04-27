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
const util_1 = __importDefault(require("util"));
const commands_1 = require("@/base/plugins/commands");
const util_2 = require("@/util");
const Owners = ["521007613475946496"];
const fn = (app) => {
    const command = new commands_1.Command({
        name: "eval",
        description: "Evaluates javascript code",
        aliases: ["ev"],
        category: "misc",
    }, ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!Owners.includes(msg.author.id))
            return;
        try {
            const respTags = [];
            let evaled = eval(args.join(" "));
            if ((evaled === null || evaled === void 0 ? void 0 : evaled.then) && typeof evaled.then === "function") {
                evaled = yield evaled;
                respTags.push("Resolved");
            }
            if (typeof evaled !== "string")
                evaled = util_1.default.inspect(evaled);
            evaled = util_2.Functions.clean(evaled);
            msg.channel.createMessage(`${util_2.Emojis.SUCCESS} | **Success** ${respTags
                .map((x) => `(${x})`)
                .join(" ")}\n\`\`\`xl\n${util_2.Functions.shorten(evaled, 1900)}\`\`\``);
        }
        catch (err) {
            msg.channel.createMessage(`${util_2.Emojis.DANGER} | **Error**\n\`\`\`xl\n${util_2.Functions.shorten(err.toString(), 1000)}\`\`\``);
        }
    }));
    app.commands.add(command);
};
exports.default = fn;
