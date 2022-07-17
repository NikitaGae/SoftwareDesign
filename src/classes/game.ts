import consoleHandling from "./singleton/consoleHandling";
import fileHandler from "./singleton/fileHandler";
import { mapDao } from "./dao/mapDao";
import { Answers } from 'prompts';
import { Main } from "..";

export class Game {

    public activeMap: mapDao | undefined;
    public currentCoordinate: string = "";
    public wallX: number = 0;
    public wallY: number = 0;
    public playerX: number = 0;
    public playerY: number = 0;

    // init the game: loads the chosen map into the starting game
    public load(_mapNr: number): void {
        let allMap: mapDao[] = fileHandler.readFile("./JSONFile/", "mapJSON.json");
        this.activeMap = allMap[_mapNr - 1];

        let spawnX: number = this.activeMap.spawnPointX;
        let spawnY: number = this.activeMap.spawnPointY;

        this.currentCoordinate = this.activeMap.places[spawnX][spawnY];

        this.wallX = this.activeMap.places.length;
        this.wallY = this.activeMap.places[0].length - 1;

        this.playerX = this.activeMap.spawnPointX;
        this.playerY = this.activeMap.spawnPointY;

        this.showDirections(this.currentCoordinate);
    }

    // show the current position and directions
    public async showDirections(_curPos: string): Promise<void> {
        let answer: Answers<string> = await consoleHandling.showAllOptions(
            [
                "North",
                "East",
                "South",
                "West",
                "Exit"
            ],
            "Current Position: " + _curPos + ". Which direction do you choose?"
        );
        this.play(parseInt(answer.value));
    }

    // wall player colision detector and also for moving the player when a direction is picked
    public play(_direction: number): void {
        switch (_direction) {
            case 1:
                if (this.playerY != 0) {
                    this.playerY--;
                    this.currentCoordinate = this.activeMap!.places[this.playerX][this.playerY];
                    this.showDirections(this.currentCoordinate);
                    break;
                } else {
                    consoleHandling.printText("There is a Wall.\n");
                    this.showDirections(this.currentCoordinate);
                    break;
                }
            case 2:
                if (this.playerX != this.wallX - 1) {
                    consoleHandling.printText(this.currentCoordinate);
                    this.playerX++;
                    this.currentCoordinate = this.activeMap!.places[this.playerX][this.playerY];
                    this.showDirections(this.currentCoordinate);
                    break;
                } else {
                    consoleHandling.printText("There is a Wall.\n");
                    this.showDirections(this.currentCoordinate);
                    break;
                }
            case 3:
                if (this.playerY != this.wallY) {
                    this.playerY++;
                    this.currentCoordinate = this.activeMap!.places[this.playerX][this.playerY];
                    this.showDirections(this.currentCoordinate);
                    break;
                } else {
                    consoleHandling.printText("There is a Wall.\n");
                    this.showDirections(this.currentCoordinate);
                    break;
                }
            case 4:
                if (this.playerX != 0) {
                    this.playerX--;
                    this.currentCoordinate = this.activeMap!.places[this.playerX][this.playerY];
                    this.showDirections(this.currentCoordinate);
                    break;
                } else {
                    consoleHandling.printText("There is a Wall. \n")
                    this.showDirections(this.currentCoordinate);
                    break;
                }
            case 5:
                let main: Main = new Main();
                main.startOptions();
                break;
        }
    }
}