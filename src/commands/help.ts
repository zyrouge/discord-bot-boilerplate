import { EmbedField } from "eris";
import path from "path";
import { AppFile } from "@/base/app";
import { Command } from "@/base/plugins/commands";
import { Colors, Emojis, Functions } from "@/util";

const pkjJson = require(path.join(__dirname, "..", "..", "package.json"));

const fn: AppFile = (app) => {
    const command = new Command(
        {
            name: "help",
            description: "Sends help message",
            aliases: ["cmds", "commands", "hlp"],
            category: "misc",
        },
        async ({ msg, args }) => {
            const allCommands = [...app.commands.commands.values()];

            const page = args[0] && !isNaN(args[0] as any) ? +args[0] - 1 : 0,
                itemsPerPage = 5;
            const startIndex = page * itemsPerPage;

            const cmds = allCommands.slice(
                startIndex,
                startIndex + itemsPerPage
            );

            if (!cmds.length)
                return msg.channel.createMessage(
                    `${Emojis.SAD} | Page **${
                        page + 1
                    }** of the commands is empty!`
                );

            const fields: EmbedField[] = [];
            cmds.forEach((cmd, i) => {
                fields.push({
                    name: `${i + startIndex + 1}) ${Functions.capitalize(
                        cmd.name
                    )}`,
                    value: [
                        `**Invokers:** ${[cmd.name, ...(cmd.aliases || [])]
                            .map((x) => `\`${x}\``)
                            .join(", ")}`,
                        `**Description:** ${cmd.description}`,
                        `**Category:** ${Functions.capitalize(cmd.category)}`,
                    ]
                        .filter((x) => x)
                        .join("\n"),
                });
            });

            msg.channel.createMessage({
                embed: {
                    author: {
                        name: `${Emojis.MUSIC} | Commands`,
                    },
                    color: Colors.YELLOW,
                    fields,
                    footer: {
                        text: `Page ${page + 1} of ${Math.ceil(
                            allCommands.length / itemsPerPage
                        )} | Total commands: ${allCommands.length} | GitHub: ${
                            (pkjJson?.repository?.url as string)?.match(
                                /^git\+(.*).git/
                            )?.[1] || "-"
                        } | Author: ${pkjJson?.author || "-"}`,
                    },
                },
            });
        }
    );

    app.commands.add(command);
};

export default fn;
