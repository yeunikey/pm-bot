import { Manager } from "./manager";
import { Logger } from "../utils/logger";
import { CommandContext, CommandMiddleware } from "grammy";
import bot, { MyContext } from "../runner";

export class CommandManager extends Manager {
    
    onStart(): void {
        this.register("start", async (ctx) => {
            await ctx.conversation.enter("selectLanguage");
        })
    }

    register(command: string, ctx: CommandMiddleware<MyContext>) {
        this.getInstance().getBot().command(command, ctx);
    }

}