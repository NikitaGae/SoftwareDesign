import { Answers } from "prompts";
import { Main } from "..";
import { mapDao } from "./dao/mapDao";
import consoleHandling from "./singleton/consoleHandling";
import fileHandler from "./singleton/fileHandler";

export class Map {
    public async createMap(): Promise<void> {
        // asks the users for all map attributes to create a map and put it into a JSON
        let title: Answers<string> = await consoleHandling.getAnswer("Enter Title:", "text");
        let spawnPointX: number = 0;
        let spawnPointY: number = 0;
        let x: Answers<string> = await consoleHandling.getAnswer("Enter X Value of map:", "text");
        let y: Answers<string> = await consoleHandling.getAnswer("Enter Y Value of map:", "text");
        let map: string[][] = [];
        // asks the user the names for every coordinate
        for (let i: number = 0; i < parseInt(x.value); i++) {
            map[i] = [];
            for (let j: number = 0; j < parseInt(y.value); j++) {
                let name: Answers<string> = await consoleHandling.getAnswer("Enter name of coordinate [" + i + "," + j + "]: ", "text");
                //load the user inputs you got into the array
                map[i][j] = name.value;
            }
        }
        // load all attributes for a map into level from type mapDao and write it into the JSON
        let level: mapDao = new mapDao(title.value, spawnPointX, spawnPointY, map);
        let allMaps: mapDao[] = fileHandler.readFile("./JSONFile/", "mapJSON.json")
        allMaps.push(level);
        fileHandler.writeFile(allMaps, "./JSONFile/", "mapJSON.json");

        let main: Main = new Main();
        main.optionsRegistered();
    }
}