import bot from "../runner";
import { User } from "../entities/user";

class LanguageUtil {

    static translate(user: User, message: string): string {
        const languageData = bot.getLanguageManager().getLanguage(user.language);

        const keys = message.split(".");
        let translation = languageData;

        for (const key of keys) {
            if (translation[key] !== undefined) {
                translation = translation[key];
            } else {
                return `Ключ-языка не найден ${message}`;
            }
        }

        return translation;
    }

}

export default LanguageUtil;