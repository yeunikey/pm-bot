import { Manager } from "./manager";
import settings from "./../../static/settings.json";
import { Logger } from "../utils/logger";
import fs from 'fs';

class LanguageManager extends Manager {

    private languages: Map<string, any> = new Map();

    onStart(): void {
        settings.languages.map(async language => {
            fs.readFile("./static/languages/" + language.key + ".json", 'utf-8', (err, data) => {
                if (err) {
                    Logger.log('Ошибка чтения файла, ' + err);
                    return;
                }
            
                try {
                    const jsonData = JSON.parse(data); // Парсинг содержимого файла в JSON
                    this.languages.set(language.key, jsonData)
                } catch (parseError) {
                    Logger.log('Ошибка при парсинге JSON, ' + language.key);
                }
            });
        })
    }

    public getLanguage(language: string) {
        return this.languages.get(language);
    }

    public getLanguages() {
        return this.languages;
    }

}

export default LanguageManager;