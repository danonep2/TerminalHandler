import { useState } from "react";
import { CommandInterface } from "../@types/command"
import { useAppContext } from "../context/app.context";
import Input from "./Input";

interface CommandFormProps {
  command?: CommandInterface;
  closeModal: () => void
}
const CommandForm = ({ command, closeModal }: CommandFormProps) => {
  const {
    scopeSelected,
    addCommand,
    editCommand,
    removeCommand
  } = useAppContext();

  const [name, setName] = useState(command?.name || '');
  const [run, setRun] = useState(command?.run || '');
  const [description, setDescription] = useState(command?.description || '');

  console.log(command)

  const handleSubmit = () => {
    if(!name || !run) {
      return;
    }

    if(command){
      _editCommand();
    } else {
      newCommand();
    }

    closeModal();
  }

  const newCommand = () => {
    const id = (scopeSelected?.commands.length + 1) || 1;

    const _command: CommandInterface = {
      id_command: id,
      name,
      description,
      isRunning: false,
      output: '',
      run,
    }

    addCommand(_command);
  }

  const _editCommand = () => {
    command.name = name;
    command.description = description;
    command.run = run;

    editCommand(command, scopeSelected);
  }

  const handleDelete = () => {
    if(command) {
      removeCommand(command, scopeSelected);
    }

    closeModal();
  }

  return (
    <div className="w-96 bg-white rounded-md p-4">
      <h1
        className='text-2xl font-bold mb-2 text-center'
      >
        {command ? 'Editar Comando' : 'Adicionar Comando'}
      </h1>

      <Input
        value={name}
        onChange={(value) => setName(value)}
        label="Nome"
        placeholder="Ex: Upgrade"
      />

      <Input
        value={run}
        onChange={(value) => setRun(value)}
        label="Comando"
        placeholder="Ex: yarn upgrade"
      />

      <Input
        value={description}
        onChange={(value) => setDescription(value)}
        label="Descrição"
        type="text-area"
      />

      <button
        className='btn-blue w-full my-2'
        onClick={() => handleSubmit()}
      >
        {command ? 'Salvar' : 'Adicionar'}
      </button>
      {command &&
        <button
          className='btn-blue bg-[#f44336] text-white w-full'
          onClick={() => handleDelete()}
        >
          Excluir
        </button>
      }
    </div>
  )
}

export default CommandForm
