import { CommandInterface } from "./command";

export interface ScopeInterface {
  id: number;
  name: string;
  directory: string;
  description: string;
  commands: CommandInterface[];
}
