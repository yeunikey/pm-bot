import { Bot, session } from "grammy";
import { MyContext } from "././runner";
import { Manager } from "./managers/manager";
import { CommandManager } from "./managers/command";
import { conversations } from "@grammyjs/conversations";
import { UserManager } from "./managers/user";
import { ConservationManager } from "./managers/conservation";

export class MyBot {
    private apiKey: string;
    private bot: Bot<MyContext>;

    private userManager = new UserManager(this);
    private conservationManager = new ConservationManager(this);
    private commandManager = new CommandManager(this);

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.bot = new Bot<MyContext>(apiKey);
    }

    public start() {
        this.plugins();
        this.managers();

        this.bot.start();
    }

    private managers() {
        this.userManager.onStart();
        this.conservationManager.onStart();
        this.commandManager.onStart();
    }

    private plugins() {
        this.bot.use(session({ initial: () => ({}) }));
        this.bot.use(conversations());
    }

    public getCommandManager() {
        return this.commandManager;
    }

    public getUserManager() {
        return this.userManager;
    }

    public getConservationManager() {
        return this.conservationManager;
    }

    public getBot() {
        return this.bot;
    }

    public getApiKey() {
        return this.apiKey;
    }

}