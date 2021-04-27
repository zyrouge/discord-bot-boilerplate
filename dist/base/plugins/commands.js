"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = exports.Command = void 0;
class Command {
    constructor(props, run) {
        if (!props.name || !props.description)
            throw new Error("Invalid 'props' were passed into 'Command'");
        Object.assign(this, props);
        this.run = run;
    }
}
exports.Command = Command;
class CommandManager {
    constructor() {
        this.commands = new Map();
        this.aliases = new Map();
    }
    add(command) {
        var _a;
        if (this.commands.has(command.name))
            throw new Error(`Command with name '${command.name}' already exists`);
        this.commands.set(command.name, command);
        (_a = command.aliases) === null || _a === void 0 ? void 0 : _a.forEach((alias) => {
            if (this.aliases.has(alias))
                throw new Error(`Command with alias '${command.name}' already exists`);
            this.aliases.set(alias, command.name);
        });
    }
    resolve(name) {
        const alias = this.aliases.get(name);
        return this.commands.get(alias || name);
    }
}
exports.CommandManager = CommandManager;
