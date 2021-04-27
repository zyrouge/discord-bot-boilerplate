"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn = (app) => {
    app.bot.on("disconnect", () => {
        app.logger.info(`Disconnected from Discord API!`);
    });
};
exports.default = fn;
