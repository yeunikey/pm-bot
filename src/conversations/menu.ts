import { InlineKeyboard, Keyboard } from "grammy";
import bot, { MyConversation, MyContext } from "../runner";
import LanguageUtil from "../utils/language";

import settings from '../../static/settings.json';
import { User } from "../entities/user";
import Settinger from "../utils/settings";

async function selectMenu(conversation: MyConversation, ctx: MyContext) {

    if (ctx.chatId == undefined || ctx.chatId < 0)
        return;

    let user = bot.getUserManager().getUser(ctx.chatId);

    if (user == null) 
        return;

    let message = await ctx.reply("Loading...");

    await menu(user, conversation, ctx, ctx.chatId, message.message_id);

}

async function menu(user: User, conversation: MyConversation, ctx: MyContext, chat_id: number, message_id: number) {
    
    let keyboard = new InlineKeyboard();

    keyboard
        .text(LanguageUtil.translate(user, "menu.faq"), "faq")
        .text(LanguageUtil.translate(user, "menu.ticket"), "tickets")
        .row()
        .text(LanguageUtil.translate(user, "menu.ai"), "AI")
        .row()
        .text(LanguageUtil.translate(user, "menu.beseda"), "beseda");

    await ctx.api.editMessageText(chat_id, message_id, LanguageUtil.translate(user, "selectMenu"), {
        reply_markup: keyboard
    });

    ctx = await conversation.wait();

    switch (ctx.callbackQuery?.data) {
        case "faq": {
            await faq(user, conversation, ctx, chat_id, message_id);
            break;
        }
        case "beseda": {
            await beseda(user, conversation, ctx, chat_id, message_id);
            break;
        }
        default: {
            await dev(user, conversation, ctx, chat_id, message_id);
        }
    }

}

async function beseda(user: User, conversation: MyConversation, ctx: MyContext, chat_id: number, message_id: number) {
    
    let keyboard = new InlineKeyboard();

    keyboard
        .text("В главное меню", "any");

    await ctx.api.editMessageText(chat_id, message_id, "Ссылка на чат абитуриентов: \nhttps://t.me/+OkxL4YfCHXlxNDVi", {
        reply_markup: keyboard,
    });

    ctx = await conversation.wait();
    await menu(user, conversation, ctx, chat_id, message_id);        

}

async function dev(user: User, conversation: MyConversation, ctx: MyContext, chat_id: number, message_id: number) {
    
    let keyboard = new InlineKeyboard();

    keyboard
        .text("В главное меню", "any");

    await ctx.api.editMessageText(chat_id, message_id, "К сожалению этот раздел ещё разрабатывается :(", {
        reply_markup: keyboard,
    });

    ctx = await conversation.wait();
    await menu(user, conversation, ctx, chat_id, message_id);        

}

async function faq(user: User, conversation: MyConversation, ctx: MyContext, chat_id: number, message_id: number) {

    let keyboard = new InlineKeyboard();

    keyboard
        .text("Выйти в меню", "menu").row();

    Settinger.of().categories.map(category => {
        keyboard.text(category).row();
    })

    await ctx.api.editMessageText(chat_id, message_id, "Выберите категорию из вопросов", {
        reply_markup: keyboard
    })

    ctx = await conversation.wait();

    if (ctx.callbackQuery?.data == "menu") {
        await menu(user, conversation, ctx, chat_id, message_id);
        return;
    }

    let category = ctx.callbackQuery?.data;

    if (category == null)
        return;

    await scenarios(user, conversation, ctx, chat_id, message_id, category);

}

async function scenarios(user: User, conversation: MyConversation, ctx: MyContext, chat_id: number, message_id: number, category: string) {
    
    let scenarios = bot.getScenarioManager().findByCategory(category);
    
    let keyboard = new InlineKeyboard();

    keyboard
        .text("Выйти в категории", "category").row();

    scenarios.map(scenario => {
        keyboard.text(scenario.title).row();
    })

    await ctx.api.editMessageText(chat_id, message_id, "Выберите вопрос из категории", {
        reply_markup: keyboard
    })

    ctx = await conversation.wait();

    if (ctx.callbackQuery?.data == "category") {
        await faq(user, conversation, ctx, chat_id, message_id);
        return;
    }

    
    
}

export default selectMenu;
