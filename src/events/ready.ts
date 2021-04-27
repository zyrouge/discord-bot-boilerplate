import { AppFile } from "@/base/app";

const fn: AppFile = (app) => {
    app.bot.on("ready", () => {
        app.logger.info(`Logged in as ${app.bot.user.username}#${app.bot.user.discriminator}!`);
    });
}

export default fn;