import { createConversation } from "@grammyjs/conversations";
import { MyConversation, MyContext } from "../runner";
import settings from "./../../static/settings.json";
import { MessageUtil } from "../utils/message";

async function selectLanguage(conversation: MyConversation, ctx: MyContext) {
    await ctx.reply(MessageUtil.format(settings.selectLanguage));
    const { message } = await conversation.wait();
    await ctx.reply(`Welcome to the chat, ${message == undefined ? "UNDEFINED" : message.text}!`);
}

export default selectLanguage;