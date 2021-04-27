import { Client as GeniusClient } from "genius-lyrics";
import { AppFile } from "@/base/app";
import { Command } from "@/base/plugins/commands";
import { Constants, Emojis, Functions } from "@/util";

const genius = new GeniusClient(undefined, {
    requestOptions: {
        headers: {
            "User-Agent": Constants.http.UserAgent,
        },
    },
});

const fn: AppFile = (app) => {
    const command = new Command(
        {
            name: "lyrics",
            description: "Sends lyrics of the specified song!",
            aliases: ["ly"],
            category: "music",
        },
        async ({ msg, args }) => {
            const term = args.join(" ");
            if (!term.length)
                return msg.channel.createMessage(
                    `${Emojis.DANGER} | Provide some arguments to resolve songs!`
                );

            try {
                const nmsg = await msg.channel.createMessage(
                    `${Emojis.SEARCH} | Searching lyrics for \`${term}\`...`
                );

                const song = (await genius.songs.search(term))?.[0];
                if (!song)
                    return nmsg.edit(`${Emojis.SAD} | Couldn't find the song!`);

                const lyrics = await song.lyrics();
                if (!lyrics?.length)
                    return nmsg.edit(
                        `${Emojis.SAD} | Couldn't find lyrics of the song!`
                    );

                const maxLength = 1500;
                const pages: string[] = [
                    `${Emojis.MUSIC} | Lyrics of **${song.featuredTitle}** by **${song.artist.name}**\n\n`,
                ];

                lyrics
                    .split("\n")
                    .filter((x) => !x.startsWith("[") && !x.endsWith("]"))
                    .forEach((line) => {
                        let i = pages.length - 1;
                        if (i < 0) i = 0;
                        if (
                            pages[i] &&
                            pages[i].length + line.length > maxLength
                        )
                            i = i + 1;
                        if (!pages[i]) pages[i] = "";
                        pages[i] += `${line}\n`;
                    });

                nmsg.delete().catch(() => {});
                for (const page of pages) {
                    msg.channel.createMessage(page);
                    await Functions.sleep(250);
                }
            } catch (err) {
                return msg.channel.createMessage(
                    `${Emojis.DANGER} | Something went wrong! (${
                        err?.message ? err.message : err.toString()
                    })`
                );
            }
        }
    );

    app.commands.add(command);
};

export default fn;
