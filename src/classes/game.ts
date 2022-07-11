import consoleHandling from "./singleton/consoleHandling";
import fileHandler from "./singleton/fileHandler";
import { mapDao } from "./dao/mapDao";
import { Answers } from 'prompts';

export class Game {

    public load(mapNr: number): void {
        let allMap: mapDao[] = fileHandler.readFile("./JSONFile/", "mapJSON.json");
        let map: mapDao = allMap[mapNr];
    }

    private async showDirections(): Promise<void> {
        let answer: Answers<string> = await consoleHandling.fiveOptions(
            [
                "North",
                "East",
                "South",
                "West",
                "Exit"
            ],
            "Which direction do you choose?"
        );
        this.play(parseInt(answer.value));
    }

    public play(direction: number): void {
        // let playerX: number = map.spawnPointX;
        // let playerY: number = allMap[].spawnPointY;
        // let wandY: number = parseInt(allMap[].map[0][length - 1]);
        // let wandX: number = parseInt(allMap[].map[length - 1][0]);

        switch (direction) {
            case 1:
                if (playerY > 0) {
                    playerY--;
                    this.showDirections();
                    break;
                } else {
                    consoleHandling.printText("There is a Wand brother.\n");
                    this.showDirections();
                }
            case 2:
                if(playerY > wandX){
                playerX++;
                this.showDirections();
                break;
                } else {
                    consoleHandling.printText("There is a Wand brother.\n");
                    this.showDirections();
                }
            case 3:
                if (playerY > wandY) {
                    playerY++;
                    this.showDirections();
                    break;
                } else {
                    consoleHandling.printText("There is a Wand brother.\n");
                    this.showDirections();
                }
            case 4:
                if (playerX > 0) {
                    playerX--;
                    this.showDirections();
                    break;
                } else {
                    consoleHandling.printText("there is a Wand brother. \n")
                    this.showDirections();
                }
            case 5:
                consoleHandling.printText("Exit.\n");
                break;
        }
    }
}