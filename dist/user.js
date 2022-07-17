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
exports.User = void 0;
const consoleHandling_1 = __importDefault(require("./classes/singleton/consoleHandling"));
const fileHandler_1 = __importDefault(require("./classes/singleton/fileHandler"));
class User {
    static getInstance() {
        return User._instance;
    }
    // function to register and check the new users
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            // ask the user for username and password
            let username = yield consoleHandling_1.default.getAnswer("Enter username:", "text");
            let password = yield consoleHandling_1.default.getAnswer("Enter password", 'text');
            // check if username is used with usernameCheck function 
            if (yield this.usernameCheck(username.value)) {
                // check the username with the function regEx
                if (this.regEx(username.value)) {
                    let userObject = { username: username.value, password: password.value };
                    let data = fileHandler_1.default.readFile("./JSONFile/", "userJSON.json");
                    data.push(userObject);
                    fileHandler_1.default.writeFile(data, "./JSONFile/", "userJSON.json");
                    consoleHandling_1.default.printText("You are registrated.\n");
                    return true;
                }
                else {
                    consoleHandling_1.default.printText("Username invalid. No special characters and only 10 characters in total allowed!\n");
                }
            }
            return false;
        });
    }
    // get the values checked with allUser from the JSON file users if true you are successful logged in
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            let username = yield consoleHandling_1.default.getAnswer("Enter username:", 'text');
            let password = yield consoleHandling_1.default.getAnswer("Enter password", 'password');
            let allUser = fileHandler_1.default.readFile("./JSONFile/", "userJSON.json");
            for (let i = 0; i < allUser.length; i++) {
                if (allUser[i].username == username.value && allUser[i].password == password.value) {
                    consoleHandling_1.default.printText("You are Logged in.\n");
                    return true;
                }
            }
            consoleHandling_1.default.printText("Wrong Values.\n");
            return false;
        });
    }
    // check the username with the JSON file and compare with all user
    usernameCheck(_username) {
        return __awaiter(this, void 0, void 0, function* () {
            let allUser = fileHandler_1.default.readFile("./JSONFile/", "userJSON.json");
            for (let i = 0; i < allUser.length; i++) {
                if (allUser[i].username == _username) {
                    consoleHandling_1.default.printText("This username is already used.\n");
                    return false;
                }
            }
            return true;
        });
    }
    // check the username if its only contains letters from a-z A-Z and numbers from 0-9 and not longer as 10 symbols
    regEx(_username) {
        let regExUsername = /^([a-z0-9A-Z]{1,10})$/;
        return regExUsername.test(_username);
    }
}
exports.User = User;
User._instance = new User();
exports.default = User.getInstance();
//# sourceMappingURL=user.js.map