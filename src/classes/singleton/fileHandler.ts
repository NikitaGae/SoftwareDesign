import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"

class FileHandler {
  private static _instance: FileHandler = new FileHandler()

  private constructor() {
    if (FileHandler._instance)
      throw new Error("Use FileHandler.getInstance() instead new FileHandler()")
    FileHandler._instance = this
  }

  public static getInstance(): FileHandler {
    return FileHandler._instance
  }

  // write datta to a file
  public writeFile(_dataToWrite: any, _pathToFile: string, _file: string) {
    if(!existsSync(_pathToFile))
      mkdirSync(_pathToFile)

    writeFileSync(_pathToFile + _file, JSON.stringify(_dataToWrite))
    
  }

  // read data out of a file 
  public readFile(_pathToFile: string, _file: string) : any {
    if(!existsSync(_pathToFile)) {
      console.log("Dateipfad existiert nicht! Datei kann nicht gelesen werden!")
      return ""
    }

    let raw : Buffer = readFileSync(_pathToFile + _file);
    return JSON.parse(raw.toString())
  }
}

export default FileHandler.getInstance()