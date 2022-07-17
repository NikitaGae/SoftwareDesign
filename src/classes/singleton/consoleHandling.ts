import { createInterface, ReadLine } from "readline"
import prompts, { Answers, PromptType } from 'prompts';

class ConsoleHandling {
  private static _instance: ConsoleHandling = new ConsoleHandling()

  private consoleLine: ReadLine = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  private constructor() {
    if (ConsoleHandling._instance)
      throw new Error("Use ConsoleHandling.getInstance() instead new ConsoleHandling()")
    ConsoleHandling._instance = this
  }

  public static getInstance(): ConsoleHandling {
    return ConsoleHandling._instance
  }

  // print a text in the console
  public printText(_input: string) {
    this.consoleLine.write(_input)
    this.consoleLine.write("\n")
  }

  // show as many options as available
  public showAllOptions(_options: string[], _question: string): Promise<Answers<string>> {
    let choices: any[] = [];

    for (let i: number = 1; i <= _options.length; i++) {
      choices.push({ title: _options[i - 1], value: i });
    }
    
    return prompts({
        type: 'select',
        name: 'value',
        message: _question,
        choices: choices,
    });
}

  //get the answers out of input values
  public getAnswer(_message: string, _type: PromptType): Promise<Answers<string>> {
    return prompts({
      type: _type,
      name: "value",
      message: _message,
      initial: ""
    });

  }
}
export default ConsoleHandling.getInstance()