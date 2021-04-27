import { AppFile } from "@/base/app";
import Eris from "eris";

const fn: AppFile = (app) => {
    app.bot.on("messageCreate", (msg: Eris.Message<Eris.GuildTextableChannel>) => {
        if (msg.author.bot || !("guild" in msg.channel)) return;
        
        const prefix = process.env.PREFIX;
        if (!prefix || !msg.content.startsWith(prefix)) return;

        const content = msg.content.slice(prefix.length);
        const [cmdName, ...args] = content.split(" ");

        const command = app.commands.resolve(cmdName);
        if (!command) return;
    
        command.run({
            msg,
            prefix,
            args
        });
    });
}

export default fn;