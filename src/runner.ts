import {
    type Conversation,
    type ConversationFlavor
} from "@grammyjs/conversations";
  
import { type Context } from "grammy";
import { MyBot } from "./bot";

export type MyContext = Context & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;

let bot: MyBot = new MyBot("6955877575:AAEnGiWK-vHkdVOXf1CHh1cmd3Q28Uuc974");
bot.start();

export default bot;