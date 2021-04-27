import { Client, ClientOptions } from "eris";

export interface BotOptions {
    token: string;
    erisOptions?: ClientOptions;
}

export class Bot extends Client {
    constructor(options: BotOptions) {
        super(options.token, options.erisOptions);
    }
}