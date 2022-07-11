import { Answers } from "prompts";
import { mapDao } from "./dao/mapDao";
import consoleHandling from "./singleton/consoleHandling";
import fileHandler from "./singleton/fileHandler";

export class Map {

    public async createMap(): Promise<void> {
        let title: Answers<string> = await consoleHandling.getAnswer("Enter Title:", "text");
        let spawnPointX: number = 0;
        let spawnPointY: number = 0;
        let x: Answers<string> = await consoleHandling.getAnswer("Enter X Value of map:", "text");
        let y: Answers<string> = await consoleHandling.getAnswer("Enter Y Value of map:", "text");
        let map: string[][] = [];
        for (let i: number = 0; i < parseInt(x.value); i++) {
            map[i] = [];
            for (let j: number = 0; j < parseInt(y.value); j++) {
                let name: Answers<string> = await consoleHandling.getAnswer("Enter name of coordinate [" + i + "," + j + "]: ", "text");
                map[i][j] = name.value;
            }
        }
        let level: mapDao = new mapDao(title.value, spawnPointX, spawnPointY, map);
        let data: mapDao[] = fileHandler.readFile("./JSONFile/", "mapJSON.json")
        data.push(level);
        fileHandler.writeFile(data, "./JSONFile/", "mapJSON.json");
    }
}