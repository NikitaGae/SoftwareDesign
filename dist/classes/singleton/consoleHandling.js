"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const prompts_1 = __importDefault(require("prompts"));
class ConsoleHandling {
    constructor() {
        this.consoleLine = readline_1.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        if (ConsoleHandling._instance)
            throw new Error("Use ConsoleHandling.getInstance() instead new ConsoleHandling()");
        ConsoleHandling._instance = this;
    }
    static getInstance() {
        return ConsoleHandling._instance;
    }
    // print a text in the console
    printText(_input) {
        this.consoleLine.write(_input);
        this.consoleLine.write("\n");
    }
    // show as many options as available
    showAllOptions(_options, _question) {
        let choices = [];
        for (let i = 1; i <= _options.length; i++) {
            choices.push({ title: _options[i - 1], value: i });
        }
        return prompts_1.default({
            type: 'select',
            name: 'value',
            message: _question,
            choices: choices,
        });
    }
    //get the answers out of input values
    getAnswer(_message, _type) {
        return prompts_1.default({
            type: _type,
            name: "value",
            message: _message,
            initial: ""
        });
    }
}
ConsoleHandling._instance = new ConsoleHandling();
exports.default = ConsoleHandling.getInstance();
//# sourceMappingURL=consoleHandling.js.map