import { Answers } from 'prompts';
import { Map } from "./classes/map";
import User from "./user";
import consoleHandling from './classes/singleton/consoleHandling';
import { mapDao } from './classes/dao/mapDao';
import fileHandler from './classes/singleton/fileHandler';
import { Game } from './classes/game';

export class Main {

  // main menu at the beginning of the application
  public async startOptions(): Promise<void> {
    let answer: Answers<string> = await consoleHandling.showAllOptions(
      [
        "Register",
        "Login",
        "Unregistered User"
      ],
      "Which option do you choose?"
    );
    switch (parseInt(answer.value)) {
      case 1:
        if (await User.register()) {
          await this.optionsRegistered();          
        }
        break;
      case 2:
        if (await User.login()) {
          await this.optionsRegistered();
        }
        break;
      case 3:
        await this.optionsUnregistered();
        break;
    }
  }

  // menu of the application after you registered
  public async optionsRegistered(): Promise<void> {
    let answer: Answers<string> = await consoleHandling.showAllOptions(
      [
        "Choose Map",
        "Create Map",
        "Go one Back"
      ],
      "Which option do you choose?"
    );
    switch (parseInt(answer.value)) {
      case 1:
        this.chooseMap();
        break;

      case 2:
        let newMap: Map = new Map;
        newMap.createMap();
        break;
      case 3:
        this.startOptions();
        break;
    }
  }

  // menu when you just want to play and dont have a account
  public async optionsUnregistered(): Promise<void> {
    let answer: Answers<string> = await consoleHandling.showAllOptions(
      [
        "Choose Map",
        "Go one Back"
      ],
      "Which option do you choose?"
    );
    switch (parseInt(answer.value)) {
      case 1:
        this.chooseMap();
        break;
      case 2:
        this.startOptions();
        break;
    }
  }

  // menu to show all maps which are currently in the JSON file to pick to play
  public async chooseMap(): Promise<void> {
    let mapArray: string[] = [];
    let allMap: mapDao[] = fileHandler.readFile("./JSONFile/", "mapJSON.json");
    for (let i: number = 0; i < allMap.length; i++) {
      mapArray.push("Titel: " + allMap[i].title.toString() + " Größe: " + allMap[i].places.length.toString() + "x" + allMap[i].places[0].length.toString());
    }

    let answer: Answers<string> = await consoleHandling.showAllOptions(
      mapArray
      ,
      "Which Map do you want to play?"
    );

    let game: Game = new Game();
    game.load(parseInt(answer.value));
  }
}

let main: Main = new Main();
main.startOptions();