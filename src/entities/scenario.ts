
class Scenario {
    public category: string;
    public title: string;
    public answer: string[]

    constructor(category: string, title: string, answer: string[]) {
        this.category = category;
        this.title = title;
        this.answer = answer;
    }

}

export default Scenario;