import Scenario from "../entities/scenario";
import { Logger } from "../utils/logger";
import { Manager } from "./manager";
import fs from 'fs';

class ScenarioManager extends Manager {

    private scenarios: Scenario[] = [];

    onStart(): void {
        fs.readdir("./static/scenarios/", (err, files) => {
            if (err) {
                Logger.log("Ошибка при чтении файлов, " + err)
                return;
            }
            files.map(file => {
                fs.readFile("./static/scenarios/" + file, 'utf-8', (err, data) => {
                    if (err) {
                        Logger.log('Ошибка при чтении файла, ' + err);
                        return;
                    }
        
                    try {
                        const jsonData = JSON.parse(data);
                        this.scenarios.push({
                            title: jsonData.title,
                            answer: jsonData.answer,
                            category: jsonData.category
                        })
                    } catch (parseError) {
                        Logger.log('Ошибка при парсинге JSON, ' + parseError);
                    }
                });
            })
        })
    }

    public findByCategory(category: string) {
        return this.scenarios.filter((scenario) => {
            return scenario.category == category;
        })
    }

    public getScenarios() {
        return this.scenarios;
    }

}

export default ScenarioManager;