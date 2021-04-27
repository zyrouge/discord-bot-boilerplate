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
require("module-alias/register");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app_1 = require("@/base/app");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    if (!process.env.TOKEN)
        throw new Error("Missing 'process.env.TOKEN'");
    const app = new app_1.App({
        botOptions: {
            token: process.env.TOKEN,
        },
    });
    yield app.dir(path_1.default.join(__dirname, "events"));
    yield app.dir(path_1.default.join(__dirname, "commands"));
    yield app.ready();
    app.logger.info(`Application loaded successfully!`);
});
start();
