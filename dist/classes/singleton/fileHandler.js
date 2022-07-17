"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class FileHandler {
    constructor() {
        if (FileHandler._instance)
            throw new Error("Use FileHandler.getInstance() instead new FileHandler()");
        FileHandler._instance = this;
    }
    static getInstance() {
        return FileHandler._instance;
    }
    // write datta to a file
    writeFile(_dataToWrite, _pathToFile, _file) {
        if (!fs_1.existsSync(_pathToFile))
            fs_1.mkdirSync(_pathToFile);
        fs_1.writeFileSync(_pathToFile + _file, JSON.stringify(_dataToWrite));
    }
    // read data out of a file 
    readFile(_pathToFile, _file) {
        if (!fs_1.existsSync(_pathToFile)) {
            console.log("Dateipfad existiert nicht! Datei kann nicht gelesen werden!");
            return "";
        }
        let raw = fs_1.readFileSync(_pathToFile + _file);
        return JSON.parse(raw.toString());
    }
}
FileHandler._instance = new FileHandler();
exports.default = FileHandler.getInstance();
//# sourceMappingURL=fileHandler.js.map