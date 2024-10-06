import { createConversation } from "@grammyjs/conversations";
import bot, { MyConversation, MyContext } from "../runner";
import settings from "./../../static/settings.json";
import { MessageUtil } from "../utils/message";
import { InlineKeyboard } from "grammy";
import { Logger } from "../utils/logger";
import { User } from "../entities/user";
import LanguageUtil from "../utils/language";

function buildKeyboard() {
    let keyboard = new InlineKeyboard();

    settings.languages.map((language) => {
        keyboard.text(language.name, language.key);
    });

    return keyboard; 
}

async function selectLanguage(conversation: MyConversation, ctx: MyContext) {

    await ctx.reply(MessageUtil.format(settings.selectLanguage), {
        reply_markup: buildKeyboard()
    });

    ctx = await conversation.wait();

    // if chat is a group return
    if (Number(ctx.chatId) < 0) return;

    let languageKey = ctx.callbackQuery?.data;

    // if that language key is undefined
    if (languageKey == undefined) return;

    let languageObject = settings.languages.filter((language) => {
        return language.key == languageKey;
    })[0];

    // register a new user to system
    let user = new User(Number(ctx.chatId), languageKey);
    bot.getUserManager().addUser(user);

    await ctx.reply(LanguageUtil.translate(user, "selectedLanguage")
                .replace("%language%", languageObject.name));

    await ctx.conversation.enter("selectMenu");
}

export default selectLanguage;
