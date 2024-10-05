import { Bot, session } from "grammy";
import { MyContext } from "././runner";
import { Manager } from "./managers/manager";
import { CommandManager } from "./managers/command";
import { conversations } from "@grammyjs/conversations";

export class MyBot {
    private apiKey: string;
    private bot: Bot<MyContext>;

    private commandManager = new CommandManager();

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.bot = new Bot<MyContext>(apiKey);
    }

    public start() {
        this.managers();
        this.plugins();

        this.bot.start();
    }

    private managers() {
        this.commandManager.onStart();
    }

    private plugins() {
        this.bot.use(session({ initial: () => ({}) }));
        this.bot.use(conversations());
    }

    public getCommandManager() {
        return this.commandManager;
    }

    public getBot() {
        return this.bot;
    }

    public getApiKey() {
        return this.apiKey;
    }

}