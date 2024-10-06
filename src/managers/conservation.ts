import { ConversationFn, createConversation } from "@grammyjs/conversations";
import { Manager } from "./manager";
import bot, { MyContext } from "../runner";
import selectLanguage from "../conversations/language";
import { Logger } from "../utils/logger";

export class ConservationManager extends Manager {

    onStart(): void {
        this.register(selectLanguage);
    }

    register(test: ConversationFn<MyContext>) {
        this.getInstance().getBot().use(createConversation(test));
    }

}