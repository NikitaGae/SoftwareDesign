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

  public writeFile(dataToWrite: any, pathToFile: string, file: string) {
    if(!existsSync(pathToFile))
      mkdirSync(pathToFile)

    writeFileSync(pathToFile + file, JSON.stringify(dataToWrite))
    
  }

  public readFile(pathToFile: string, file: string) : any {
    if(!existsSync(pathToFile)) {
      console.log("Dateipfad existiert nicht! Datei kann nicht gelesen werden!")
      return ""
    }

    let raw : Buffer = readFileSync(pathToFile + file);
    return JSON.parse(raw.toString())
  }
}

export default FileHandler.getInstance()