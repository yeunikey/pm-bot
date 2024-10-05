// import { createConversation } from "@grammyjs/conversations";
// import { MyConversation, MyContext } from "../runner";

// async function selectLanguage(conversation: MyConversation, ctx: MyContext) {
//     await ctx.reply("Hi there! What is your name?");
//     const { message } = await conversation.wait();
//     await ctx.reply(`Welcome to the chat, ${message == undefined ? "UNDEFINED" : message.text}!`);
// }

// bot.use(createConversation(selectLanguage));