import { useEffect } from "react";
import { CommandInterface } from "../@types/command";
import {
  AiOutlineCaretRight,
} from "react-icons/ai";

import {
  AiOutlineBorder
} from "react-icons/ai";
import { useAppContext } from "../context/app.context";
import { MdModeEdit } from "react-icons/md";

interface CommandItemListProps {
  command: CommandInterface;
  selectCommand: () => void;
  editCommand: (command: CommandInterface) => void;
  isSelected: boolean;
}

const CommandItemList = ({ command, selectCommand, isSelected, editCommand }: CommandItemListProps) => {
  const { scopeSelected, updateIsRunning } = useAppContext();

  const start = (event) => {
    event.stopPropagation();
    updateIsRunning(scopeSelected?.id, command.id_command, true);

    const data = {
      id_scope: scopeSelected?.id,
      id_command: command.id_command,
      command: command.run,
      directory: scopeSelected?.directory
    }

    // @ts-ignore
    window.api.iniciarComandoWatch(JSON.stringify(data));

    selectCommand();
  };

  const stop = (event) => {
    event.stopPropagation();
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
        <MdModeEdit
          color="#060"
          className={`hover:bg-gray-200 rounded-full transition-all ease-in-out duration-300 ${command.isRunning && "cursor-not-allowed"}`}
          onClick={() => !command.isRunning && editCommand(command)}
        />
        {command.isRunning
          ? <AiOutlineBorder onClick={stop} color="#F00" className="hover:bg-gray-200 rounded-full transition-all ease-in-out duration-300"/>
          : <AiOutlineCaretRight onClick={start} color="#00F" className="hover:bg-gray-200 rounded-full transition-all ease-in-out duration-300"/>
        }
      </div>
    </div>
  )
}

export default CommandItemList;
