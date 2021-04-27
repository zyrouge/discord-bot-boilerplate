import util from "util";
import { AppFile } from "@/base/app";
import { Command } from "@/base/plugins/commands";
import { Emojis, Functions } from "@/util";

const Owners: string[] = ["521007613475946496"];

const fn: AppFile = (app) => {
    const command = new Command(
        {
            name: "eval",
            description: "Evaluates javascript code",
            aliases: ["ev"],
            category: "misc",
        },
        async ({ msg, args }) => {
            if (!Owners.includes(msg.author.id)) return;
            try {
                const respTags: string[] = [];

                let evaled = eval(args.join(" "));

                if (evaled?.then && typeof evaled.then === "function") {
                    evaled = await evaled;
                    respTags.push("Resolved");
                }

                if (typeof evaled !== "string") evaled = util.inspect(evaled);
                evaled = Functions.clean(evaled);

                msg.channel.createMessage(
                    `${Emojis.SUCCESS} | **Success** ${respTags
                        .map((x) => `(${x})`)
                        .join(" ")}\n\`\`\`xl\n${Functions.shorten(
                        evaled,
                        1900
                    )}\`\`\``
                );
            } catch (err) {
                msg.channel.createMessage(
                    `${
                        Emojis.DANGER
                    } | **Error**\n\`\`\`xl\n${Functions.shorten(
                        err.toString(),
                        1000
                    )}\`\`\``
                );
            }
        }
    );

    app.commands.add(command);
};

export default fn;
