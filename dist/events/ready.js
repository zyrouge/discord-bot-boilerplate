"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn = (app) => {
    app.bot.on("ready", () => {
        app.logger.info(`Logged in as ${app.bot.user.username}#${app.bot.user.discriminator}!`);
    });
};
exports.default = fn;
