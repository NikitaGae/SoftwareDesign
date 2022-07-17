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
exports.Map = void 0;
const __1 = require("..");
const mapDao_1 = require("./dao/mapDao");
const consoleHandling_1 = __importDefault(require("./singleton/consoleHandling"));
const fileHandler_1 = __importDefault(require("./singleton/fileHandler"));
class Map {
    createMap() {
        return __awaiter(this, void 0, void 0, function* () {
            // asks the users for all map attributes to create a map and put it into a JSON
            let title = yield consoleHandling_1.default.getAnswer("Enter Title:", "text");
            let spawnPointX = 0;
            let spawnPointY = 0;
            let x = yield consoleHandling_1.default.getAnswer("Enter X Value of map:", "text");
            let y = yield consoleHandling_1.default.getAnswer("Enter Y Value of map:", "text");
            let map = [];
            // asks the user the names for every coordinate
            for (let i = 0; i < parseInt(x.value); i++) {
                map[i] = [];
                for (let j = 0; j < parseInt(y.value); j++) {
                    let name = yield consoleHandling_1.default.getAnswer("Enter name of coordinate [" + i + "," + j + "]: ", "text");
                    //load the user inputs you got into the array
                    map[i][j] = name.value;
                }
            }
            // load all attributes for a map into level from type mapDao and write it into the JSON
            let level = new mapDao_1.mapDao(title.value, spawnPointX, spawnPointY, map);
            let allMaps = fileHandler_1.default.readFile("./JSONFile/", "mapJSON.json");
            allMaps.push(level);
            fileHandler_1.default.writeFile(allMaps, "./JSONFile/", "mapJSON.json");
            let main = new __1.Main();
            main.optionsRegistered();
        });
    }
}
exports.Map = Map;
//# sourceMappingURL=map.js.map