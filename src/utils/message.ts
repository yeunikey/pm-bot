export class MessageUtil {

    static format(message: string[]) {
        let formatted = "";
        for (let msg of message) {
            formatted = formatted + msg + "\n";
        }
        return formatted;
    }

}