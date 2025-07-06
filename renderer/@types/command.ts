import { ArgumentsInterface } from "./arguments";

export interface CommandInterface {
  id_command: number;
  name: string;
  description: string;
  isRunning: boolean;
  run: string;
  output: string;
  needAdmin?: boolean;
  arguments?: ArgumentsInterface[];
}
