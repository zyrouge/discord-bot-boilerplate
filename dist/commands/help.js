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
const path_1 = __importDefault(require("path"));
const commands_1 = require("@/base/plugins/commands");
const util_1 = require("@/util");
const pkjJson = require(path_1.default.join(__dirname, "..", "..", "package.json"));
const fn = (app) => {
    const command = new commands_1.Command({
        name: "help",
        description: "Sends help message",
        aliases: ["cmds", "commands", "hlp"],
        category: "misc",
    }, ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const allCommands = [...app.commands.commands.values()];
        const page = args[0] && !isNaN(args[0]) ? +args[0] - 1 : 0, itemsPerPage = 5;
        const startIndex = page * itemsPerPage;
        const cmds = allCommands.slice(startIndex, startIndex + itemsPerPage);
        if (!cmds.length)
            return msg.channel.createMessage(`${util_1.Emojis.SAD} | Page **${page + 1}** of the commands is empty!`);
        const fields = [];
        cmds.forEach((cmd, i) => {
            fields.push({
                name: `${i + startIndex + 1}) ${util_1.Functions.capitalize(cmd.name)}`,
                value: [
                    `**Invokers:** ${[cmd.name, ...(cmd.aliases || [])]
                        .map((x) => `\`${x}\``)
                        .join(", ")}`,
                    `**Description:** ${cmd.description}`,
                    `**Category:** ${util_1.Functions.capitalize(cmd.category)}`,
                ]
                    .filter((x) => x)
                    .join("\n"),
            });
        });
        msg.channel.createMessage({
            embed: {
                author: {
                    name: `${util_1.Emojis.MUSIC} | Commands`,
                },
                color: util_1.Colors.YELLOW,
                fields,
                footer: {
                    text: `Page ${page + 1} of ${Math.ceil(allCommands.length / itemsPerPage)} | Total commands: ${allCommands.length} | GitHub: ${((_c = (_b = (_a = pkjJson === null || pkjJson === void 0 ? void 0 : pkjJson.repository) === null || _a === void 0 ? void 0 : _a.url) === null || _b === void 0 ? void 0 : _b.match(/^git\+(.*).git/)) === null || _c === void 0 ? void 0 : _c[1]) || "-"} | Author: ${(pkjJson === null || pkjJson === void 0 ? void 0 : pkjJson.author) || "-"}`,
                },
            },
        });
    }));
    app.commands.add(command);
};
exports.default = fn;
