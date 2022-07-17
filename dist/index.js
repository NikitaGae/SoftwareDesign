"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const map_1 = require("./classes/map");
const user_1 = __importDefault(require("./user"));
const consoleHandling_1 = __importDefault(require("./classes/singleton/consoleHandling"));
const fileHandler_1 = __importDefault(require("./classes/singleton/fileHandler"));
const game_1 = require("./classes/game");
class Main {
    // main menu at the beginning of the application
    startOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            let answer = yield consoleHandling_1.default.showAllOptions([
                "Register",
                "Login",
                "Unregistered User"
            ], "Which option do you choose?");
            switch (parseInt(answer.value)) {
                case 1:
                    if (yield user_1.default.register()) {
                        yield this.optionsRegistered();
                    }
                    break;
                case 2:
                    if (yield user_1.default.login()) {
                        yield this.optionsRegistered();
                    }
                    break;
                case 3:
                    yield this.optionsUnregistered();
                    break;
            }
        });
    }
    // menu of the application after you registered
    optionsRegistered() {
        return __awaiter(this, void 0, void 0, function* () {
            let answer = yield consoleHandling_1.default.showAllOptions([
                "Choose Map",
                "Create Map",
                "Go one Back"
            ], "Which option do you choose?");
            switch (parseInt(answer.value)) {
                case 1:
                    this.chooseMap();
                    break;
                case 2:
                    let newMap = new map_1.Map;
                    newMap.createMap();
                    break;
                case 3:
                    this.startOptions();
                    break;
            }
        });
    }
    // menu when you just want to play and dont have a account
    optionsUnregistered() {
        return __awaiter(this, void 0, void 0, function* () {
            let answer = yield consoleHandling_1.default.showAllOptions([
                "Choose Map",
                "Go one Back"
            ], "Which option do you choose?");
            switch (parseInt(answer.value)) {
                case 1:
                    this.chooseMap();
                    break;
                case 2:
                    this.startOptions();
                    break;
            }
        });
    }
    // menu to show all maps which are currently in the JSON file to pick to play
    chooseMap() {
        return __awaiter(this, void 0, void 0, function* () {
            let mapArray = [];
            let allMap = fileHandler_1.default.readFile("./JSONFile/", "mapJSON.json");
            for (let i = 0; i < allMap.length; i++) {
                mapArray.push("Titel: " + allMap[i].title.toString() + " Größe: " + allMap[i].places.length.toString() + "x" + allMap[i].places[0].length.toString());
            }
            let answer = yield consoleHandling_1.default.showAllOptions(mapArray, "Which Map do you want to play?");
            let game = new game_1.Game();
            game.load(parseInt(answer.value));
        });
    }
}
exports.Main = Main;
let main = new Main();
main.startOptions();
//# sourceMappingURL=index.js.map