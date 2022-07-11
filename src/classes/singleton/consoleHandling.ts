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

  public printText(input: string) {
    this.consoleLine.write(input)
    this.consoleLine.write("\n")
  }

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


  public oneOptions(options: string[], question: string): Promise<Answers<string>> {
    return prompts({
      type: 'select',
      name: 'value',
      message: question,
      choices: [
        { title: options[0], value: '1' }
      ],
      initial: 1
    })
  }

  public fiveOptions(options: string[], question: string): Promise<Answers<string>> {
    return prompts({
      type: 'select',
      name: 'value',
      message: question,
      choices: [
        { title: options[0], value: '1' },
        { title: options[1], value: '2' },
        { title: options[2], value: '3' },
        { title: options[3], value: '4' },
        { title: options[4], value: '5' },
      ],
      initial: 1
    })
  }

  public threeOptions(options: string[], question: string): Promise<Answers<string>> {
    return prompts({
      type: 'select',
      name: 'value',
      message: question,
      choices: [
        { title: options[0], value: '1' },
        { title: options[1], value: '2' },
        { title: options[2], value: '3' }
      ],
      initial: 1
    })
  }

  public askForMap(): Promise<Answers<string>> {
    return prompts({
      type: "number",
      name: "value",
      message: "Which Map do you want to play?",
      initial: 1,
      min: 5,
    })
  }

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