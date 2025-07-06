import { ChildProcessWithoutNullStreams } from "child_process";

export interface CommandBackground {
  id_scope: number;
  id_command: number;
  handdle: ChildProcessWithoutNullStreams;
}
