import { AppFile } from "@/base/app";

const fn: AppFile = (app) => {
    app.bot.on("disconnect", () => {
        app.logger.info(`Disconnected from Discord API!`);
    });
}

export default fn;