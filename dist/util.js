"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = exports.Functions = exports.Colors = exports.Emojis = void 0;
const axios_1 = __importDefault(require("axios"));
const util_1 = __importDefault(require("util"));
exports.Emojis = {
    TIMER: "⏲",
    PING_PONG: "🏓",
    DANGER: "‼",
    MUSIC: "🎶",
    SEARCH: "🔎",
    SUCCESS: "👍",
    SAD: "😔",
    PLAY: "▶️",
    PAUSE: "⏸️",
    WAVE: "👋",
    REPEAT: "🔄",
    SINGLE_REPEAT: "🔂",
};
exports.Colors = {
    YELLOW: 16767232,
};
exports.Functions = {
    clean: (text) => text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203)),
    shorten: (text, length, dots = true) => text.length > length
        ? text.slice(0, length - 3) + (dots ? "..." : "")
        : text,
    chunk: (arr, slices) => [
        arr.slice(0, slices),
        ...(arr.length - slices > 0
            ? exports.Functions.chunk(arr.slice(slices), slices)
            : []),
    ],
    capitalize: (text) => text
        .split(" ")
        .map((x) => `${x[0].toUpperCase()}${x.slice(1)}`)
        .join(" "),
    shuffle: (arr) => arr.sort((a, b) => Math.random() - 0.5),
    http: axios_1.default,
    sleep: util_1.default.promisify(setTimeout),
};
exports.Constants = {
    http: {
        UserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36",
    },
};
