"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const eris_1 = require("eris");
class Bot extends eris_1.Client {
    constructor(options) {
        super(options.token, options.erisOptions);
    }
}
exports.Bot = Bot;
