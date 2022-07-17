import { Answers } from "prompts";
import { userDao } from "./classes/dao/userDao";
import consoleHandling from "./classes/singleton/consoleHandling";
import fileHandler from "./classes/singleton/fileHandler";

export class User {

    private static _instance: User = new User()

    public static getInstance(): User {
        return User._instance
    }

    // function to register and check the new users
    public async register(): Promise<boolean> {
        // ask the user for username and password
        let username: Answers<string> = await consoleHandling.getAnswer("Enter username:", "text");
        let password: Answers<string> = await consoleHandling.getAnswer("Enter password", 'text');

        // check if username is used with usernameCheck function 
        if (await this.usernameCheck(username.value)) {
            // check the username with the function regEx
            if (this.regEx(username.value)) {
                let userObject: userDao = { username: username.value, password: password.value };
                let data: userDao[] = fileHandler.readFile("./JSONFile/", "userJSON.json")

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

    // get the values checked with allUser from the JSON file users if true you are successful logged in
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

    // check the username with the JSON file and compare with all user
    public async usernameCheck(_username: string): Promise<boolean> {
        let allUser: userDao[] = fileHandler.readFile("./JSONFile/", "userJSON.json");
        for (let i: number = 0; i < allUser.length; i++) {
            if (allUser[i].username == _username) {
                consoleHandling.printText("This username is already used.\n");
                return false;
            }
        }
        return true;
    }

    // check the username if its only contains letters from a-z A-Z and numbers from 0-9 and not longer as 10 symbols
    public regEx(_username: string): boolean {
        let regExUsername: RegExp = /^([a-z0-9A-Z]{1,10})$/;
        return regExUsername.test(_username);
    }

}
export default User.getInstance()