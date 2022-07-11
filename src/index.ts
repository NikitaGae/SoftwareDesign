import { Answers } from 'prompts';
import { Map } from "./classes/map";
import User from "./user";
import consoleHandling from './classes/singleton/consoleHandling';
import { mapDao } from './classes/dao/mapDao';
import fileHandler from './classes/singleton/fileHandler';

//let newUser: User = new User;

export class Main {

  public async startOptions(): Promise<void> {
    let answer: Answers<string> = await consoleHandling.threeOptions(
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
        await this.optionsGuest();
        break;
    }
  }

  public async optionsRegistered(): Promise<void> {
    let answer: Answers<string> = await consoleHandling.threeOptions(
      [
        "Choose Map",
        "Create Map",
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
    }
  }

  public async optionsGuest(): Promise<void> {
    let answer: Answers<string> = await consoleHandling.oneOptions(
      [
        "Choose a Map",
      ],
      "Which option do you choose?"
    );
    this.selectOption(parseInt(answer.value));
  }



  private async chooseMap(): Promise<void> {
    let mapArray: string[] = [];
    let allMap: mapDao[] = fileHandler.readFile("./JSONFile/", "mapJSON.json");
    for (let i: number = 0; i < allMap.length; i++) {
      mapArray.push("Titel: " + allMap[i].title.toString() + " Größe: " + allMap[i].map.length.toString() + "x" + allMap[i].map[0].length.toString());
    }

    let answer: Answers<string> = await consoleHandling.showAllOptions(
      mapArray
      ,
      "Which Map do you want to play?"
    );

    
  }

  private async selectOption(_option: number) {
    switch (_option) {
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
        await this.optionsGuest();
        break;
    }
  }

}

let main: Main = new Main();
main.startOptions();