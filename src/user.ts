import { Answers } from "prompts";
import { userDao } from "./classes/dao/userDao";
import consoleHandling from "./classes/singleton/consoleHandling";
import fileHandler from "./classes/singleton/fileHandler";

export class User {

    private static instance: User = new User()

    public static getInstance(): User {
        return User.instance
    }

    public async register(): Promise<boolean> {
        let username: Answers<string> = await consoleHandling.getAnswer("Enter username:", "text");
        let password: Answers<string> = await consoleHandling.getAnswer("Enter password", 'text');          

        if (await this.usernameCheck(username.value)) {
            if (this.regEx(username.value)) {
                let userObject: userDao = { username: username.value, password: password.value };
                console.log(fileHandler.readFile("./JSONFile/" ,"userJSON.json"));
                let data: userDao[] = fileHandler.readFile("./JSONFile/" ,"userJSON.json")

                data.push(userObject);
                fileHandler.writeFile(data, "./JSONFile/", "userJSON.json");
                consoleHandling.printText("You are registrated.\n");
                return true;
            } else {
                consoleHandling.printText("Username invalid. No special characters and only 10 characters in total allowed!\n");
            }
        }
        return false;
    }

    
    public async login(): Promise<boolean> {
        let username: Answers<string> = await consoleHandling.getAnswer("Enter username:", 'text');
        let password: Answers<string> = await consoleHandling.getAnswer("Enter password", 'password');
        let allUser: userDao[] = fileHandler.readFile("./JSONFile/", "userJSON.json");
        for (let i: number = 0; i < allUser.length; i++) {
            if (allUser[i].username == username.value && allUser[i].password == password.value) {
                consoleHandling.printText("You are Logged in.\n");
                return true;
            }
        }
        consoleHandling.printText("Wrong Values.\n");
        return false;
    }

    private async usernameCheck(_username: string): Promise<boolean> {
        let allUser: userDao[] = fileHandler.readFile("./JSONFile/", "userJSON.json");
        for (let i: number = 0; i < allUser.length; i++) {
            if (allUser[i].username == _username) {
                consoleHandling.printText("This username is already used.\n");
                return false;
            }
        }
        return true;
    }

    public regEx(_name: string): boolean {
        let regExUsername: RegExp = /^[a-zA-Z0-9]{1,11}$/;
        return regExUsername.test(_name);
      }

}
export default User.getInstance()