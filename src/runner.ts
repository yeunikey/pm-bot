import {
    type Conversation,
    type ConversationFlavor
} from "@grammyjs/conversations";
  
import { type Context } from "grammy";
import { MyBot } from "./bot";

export type MyContext = Context & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;

let bot: MyBot = new MyBot("7914805923:AAFTNdBeSq7APuxT5aCQq0bRtOQKAU5zOac");
bot.start();

export default bot;