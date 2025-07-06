import { ArgumentsInterface } from "./arguments";

export interface CommandInterface {
  id_command: number;
  name: string;
  description: string;
  isRunning: boolean;
  command: string;
  output: string;
  handdle?: any;
  needAdmin?: boolean;
  arguments?: ArgumentsInterface[];
}
