import axios from "axios";
import util from "util";

export const Emojis = {
    TIMER: "β²",
    PING_PONG: "π",
    DANGER: "βΌ",
    MUSIC: "πΆ",
    SEARCH: "π",
    SUCCESS: "π",
    SAD: "π",
    PLAY: "βΆοΈ",
    PAUSE: "βΈοΈ",
    WAVE: "π",
    REPEAT: "π",
    SINGLE_REPEAT: "π",
};

export const Colors = {
    YELLOW: 16767232,
};

export const Functions = {
    clean: (text: string) =>
        text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203)),
    shorten: (text: string, length: number, dots: boolean = true) =>
        text.length > length
            ? text.slice(0, length - 3) + (dots ? "..." : "")
            : text,
    chunk: <T>(arr: T[], slices: number): T[][] => [
        arr.slice(0, slices),
        ...(arr.length - slices > 0
            ? Functions.chunk(arr.slice(slices), slices)
            : []),
    ],
    capitalize: (text: string) =>
        text
            .split(" ")
            .map((x) => `${x[0].toUpperCase()}${x.slice(1)}`)
            .join(" "),
    shuffle: <T>(arr: T[]): T[] => arr.sort((a, b) => Math.random() - 0.5),
    http: axios,
    sleep: util.promisify(setTimeout),
};

export const Constants = {
    http: {
        UserAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36",
    },
};
