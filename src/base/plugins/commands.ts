import Eris from "eris";

export interface Command {
    name: string;
    description: string;
    aliases?: string[];
    usage?: string;
    cooldown?: number;
    category: "misc" | "music";
}

export type CommandRun = (options: {
    msg: Eris.Message<Eris.GuildTextableChannel>;
    args: string[];
    prefix: string;
}) => any;

export class Command {
    run: CommandRun;

    constructor(props: Omit<Command, "run">, run: CommandRun) {
        if (!props.name || !props.description)
            throw new Error("Invalid 'props' were passed into 'Command'");

        Object.assign(this, props);
        this.run = run;
    }
}

export class CommandManager {
    commands: Map<string, Command>;
    aliases: Map<string, string>;

    constructor() {
        this.commands = new Map();
        this.aliases = new Map();
    }

    add(command: Command) {
        if (this.commands.has(command.name))
            throw new Error(
                `Command with name '${command.name}' already exists`
            );
        this.commands.set(command.name, command);

        command.aliases?.forEach((alias) => {
            if (this.aliases.has(alias))
                throw new Error(
                    `Command with alias '${command.name}' already exists`
                );
            this.aliases.set(alias, command.name);
        });
    }

    resolve(name: string) {
        const alias = this.aliases.get(name);
        return this.commands.get(alias || name);
    }
}
