import { useEffect } from "react";
import { CommandInterface } from "../@types/command";
import {
  AiOutlineCaretRight,
  AiFillEdit,
} from "react-icons/ai";

import {
  AiOutlineBorder
} from "react-icons/ai";
import { useAppContext } from "../context/app.context";


interface CommandItemListProps {
  command: CommandInterface;
  selectCommand: () => void;
  isSelected: boolean;
}

const CommandItemList = ({ command, selectCommand, isSelected }: CommandItemListProps) => {
  const { scopeSelected, updateIsRunning } = useAppContext();

  const start = (event) => {
    event.stopPropagation();
    updateIsRunning(scopeSelected?.id, command.id_command, true);

    const data = {
      id_scope: scopeSelected?.id,
      id_command: command.id_command,
      command: command.command,
    }

    // @ts-ignore
    window.api.iniciarComandoWatch(JSON.stringify(data));

    selectCommand();
  };

  const stop = (event) => {
    event.stopPropagation();
    // updateIsRunning(scopeSelected?.id, command.id_command, false);

    const data = {
      id_scope: scopeSelected?.id,
      id_command: command.id_command,
    }

    // @ts-ignore
    window.api.pararComandoWatch(JSON.stringify(data));
  };

  const select = (event) => {
    event.stopPropagation();
    selectCommand();
  }

  return (
    <div
      className={`w-full flex items-center justify-between border ${isSelected ? 'border-blue-500' : ''} p-2 rounded-md bg-white/95 shadow-md transition-all ease-in-out duration-300 cursor-pointer`}
      onClick={select}
    >
      <h1
        className='font-bold mb-2 truncate'
      >
        {command.name}
      </h1>

      <div
        className="flex items-center gap-2"
      >
        <AiFillEdit color="#060"/>
        {command.isRunning
          ? <AiOutlineBorder onClick={stop} color="#F00"/>
          : <AiOutlineCaretRight onClick={start} color="#00F"/>
        }
      </div>
    </div>
  )
}

export default CommandItemList;
