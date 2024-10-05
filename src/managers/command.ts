import { Manager } from "./manager";
import { Logger } from "../utils/logger";
import { CommandContext, CommandMiddleware } from "grammy";
import bot, { MyContext } from "../runner";

export class CommandManager extends Manager {
    
    onStart(): void {
        Logger.log("Hello world")
    }

    register(command: string, ctx: CommandMiddleware<MyContext>) {
        bot.getBot().command(command, ctx);
    }

}