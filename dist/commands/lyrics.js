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
const genius_lyrics_1 = require("genius-lyrics");
const commands_1 = require("@/base/plugins/commands");
const util_1 = require("@/util");
const genius = new genius_lyrics_1.Client(undefined, {
    requestOptions: {
        headers: {
            "User-Agent": util_1.Constants.http.UserAgent,
        },
    },
});
const fn = (app) => {
    const command = new commands_1.Command({
        name: "lyrics",
        description: "Sends lyrics of the specified song!",
        aliases: ["ly"],
        category: "music",
    }, ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const term = args.join(" ");
        if (!term.length)
            return msg.channel.createMessage(`${util_1.Emojis.DANGER} | Provide some arguments to resolve songs!`);
        try {
            const nmsg = yield msg.channel.createMessage(`${util_1.Emojis.SEARCH} | Searching lyrics for \`${term}\`...`);
            const song = (_a = (yield genius.songs.search(term))) === null || _a === void 0 ? void 0 : _a[0];
            if (!song)
                return nmsg.edit(`${util_1.Emojis.SAD} | Couldn't find the song!`);
            const lyrics = yield song.lyrics();
            if (!(lyrics === null || lyrics === void 0 ? void 0 : lyrics.length))
                return nmsg.edit(`${util_1.Emojis.SAD} | Couldn't find lyrics of the song!`);
            const maxLength = 1500;
            const pages = [
                `${util_1.Emojis.MUSIC} | Lyrics of **${song.featuredTitle}** by **${song.artist.name}**\n\n`,
            ];
            lyrics
                .split("\n")
                .filter((x) => !x.startsWith("[") && !x.endsWith("]"))
                .forEach((line) => {
                let i = pages.length - 1;
                if (i < 0)
                    i = 0;
                if (pages[i] &&
                    pages[i].length + line.length > maxLength)
                    i = i + 1;
                if (!pages[i])
                    pages[i] = "";
                pages[i] += `${line}\n`;
            });
            nmsg.delete().catch(() => { });
            for (const page of pages) {
                msg.channel.createMessage(page);
                yield util_1.Functions.sleep(250);
            }
        }
        catch (err) {
            return msg.channel.createMessage(`${util_1.Emojis.DANGER} | Something went wrong! (${(err === null || err === void 0 ? void 0 : err.message) ? err.message : err.toString()})`);
        }
    }));
    app.commands.add(command);
};
exports.default = fn;
