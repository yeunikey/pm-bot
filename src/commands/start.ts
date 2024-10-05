import bot from "../../runner";

bot.command("start", async (ctx) => {
    await ctx.conversation.enter("selectLanguage");
});