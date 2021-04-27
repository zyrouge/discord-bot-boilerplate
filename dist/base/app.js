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
exports.App = void 0;
const pino_1 = __importDefault(require("pino"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const bot_1 = require("@/base/bot");
const commands_1 = require("@/base/plugins/commands");
class App {
    constructor(options) {
        this.options = options;
        this.logger = pino_1.default();
        this.bot = new bot_1.Bot(options.botOptions);
        this.commands = new commands_1.CommandManager();
    }
    dir(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield fs_1.promises.readdir(dir);
            for (const fn of files) {
                const ndir = path_1.default.join(dir, fn);
                const lstat = yield fs_1.promises.lstat(ndir);
                if (lstat.isDirectory())
                    yield this.dir(ndir);
                else
                    yield this.file(ndir);
            }
        });
    }
    file(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = require(dir);
            if (typeof (file === null || file === void 0 ? void 0 : file.default) !== "function")
                return this.logger.error(`Failed to handle ${dir}!`);
            yield file.default(this);
            this.logger.info(`Loaded ${dir} successfully!`);
        });
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bot.connect();
        });
    }
}
exports.App = App;
