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
exports.Game = void 0;
const consoleHandling_1 = __importDefault(require("./singleton/consoleHandling"));
const fileHandler_1 = __importDefault(require("./singleton/fileHandler"));
const __1 = require("..");
class Game {
    constructor() {
        this.currentCoordinate = "";
        this.wallX = 0;
        this.wallY = 0;
        this.playerX = 0;
        this.playerY = 0;
    }
    // init the game: loads the chosen map into the starting game
    load(_mapNr) {
        let allMap = fileHandler_1.default.readFile("./JSONFile/", "mapJSON.json");
        this.activeMap = allMap[_mapNr - 1];
        let spawnX = this.activeMap.spawnPointX;
        let spawnY = this.activeMap.spawnPointY;
        this.currentCoordinate = this.activeMap.places[spawnX][spawnY];
        this.wallX = this.activeMap.places.length;
        this.wallY = this.activeMap.places[0].length - 1;
        this.playerX = this.activeMap.spawnPointX;
        this.playerY = this.activeMap.spawnPointY;
        this.showDirections(this.currentCoordinate);
    }
    // show the current position and directions
    showDirections(_curPos) {
        return __awaiter(this, void 0, void 0, function* () {
            let answer = yield consoleHandling_1.default.showAllOptions([
                "North",
                "East",
                "South",
                "West",
                "Exit"
            ], "Current Position: " + _curPos + ". Which direction do you choose?");
            this.play(parseInt(answer.value));
        });
    }
    // wall player colision detector and also for moving the player when a direction is picked
    play(_direction) {
        switch (_direction) {
            case 1:
                if (this.playerY != 0) {
                    this.playerY--;
                    this.currentCoordinate = this.activeMap.places[this.playerX][this.playerY];
                    this.showDirections(this.currentCoordinate);
                    break;
                }
                else {
                    consoleHandling_1.default.printText("There is a Wall.\n");
                    this.showDirections(this.currentCoordinate);
                    break;
                }
            case 2:
                if (this.playerX != this.wallX - 1) {
                    consoleHandling_1.default.printText(this.currentCoordinate);
                    this.playerX++;
                    this.currentCoordinate = this.activeMap.places[this.playerX][this.playerY];
                    this.showDirections(this.currentCoordinate);
                    break;
                }
                else {
                    consoleHandling_1.default.printText("There is a Wall.\n");
                    this.showDirections(this.currentCoordinate);
                    break;
                }
            case 3:
                if (this.playerY != this.wallY) {
                    this.playerY++;
                    this.currentCoordinate = this.activeMap.places[this.playerX][this.playerY];
                    this.showDirections(this.currentCoordinate);
                    break;
                }
                else {
                    consoleHandling_1.default.printText("There is a Wall.\n");
                    this.showDirections(this.currentCoordinate);
                    break;
                }
            case 4:
                if (this.playerX != 0) {
                    this.playerX--;
                    this.currentCoordinate = this.activeMap.places[this.playerX][this.playerY];
                    this.showDirections(this.currentCoordinate);
                    break;
                }
                else {
                    consoleHandling_1.default.printText("There is a Wall. \n");
                    this.showDirections(this.currentCoordinate);
                    break;
                }
            case 5:
                let main = new __1.Main();
                main.startOptions();
                break;
        }
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map