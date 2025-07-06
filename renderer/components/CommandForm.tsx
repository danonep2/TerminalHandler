import { useState } from "react";
import { CommandInterface } from "../@types/command"
import { useAppContext } from "../context/app.context";
import Input from "./Input";

interface CommandFormProps {
  command?: CommandInterface;
  closeModal: () => void
}
const CommandForm = ({ command, closeModal }: CommandFormProps) => {
  const { scopeSelected, addCommand } = useAppContext();

  const [name, setName] = useState('');
  const [run, setRun] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = () => {
    if(!name || !run) {
      return;
    }

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
    closeModal();
  }

  return (
    <div className="w-96 bg-white rounded-md p-4">
      <h1
        className='text-2xl font-bold mb-2 text-center'
      >
        Adicionar Comando
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
        placeholder="Ex: yarn dev"
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
        Salvar
      </button>
    </div>
  )
}

export default CommandForm
