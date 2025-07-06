import { useState } from "react";
import { ScopeInterface } from "../@types/scope"
import Input from "./Input";
import { FcOpenedFolder } from "react-icons/fc";
import { useAppContext } from "../context/app.context";

interface ScopoFormProps {
  scope?: ScopeInterface,
  closeModal: () => void
}

const ScopoForm = ({ scope, closeModal }: ScopoFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [directory, setDirectory] = useState('');

  const { addEscope, scopeList } = useAppContext();

  const getDirectory = async () => {
    // @ts-ignore
    const _directory = await window.api.selecionarPasta();

    setDirectory(`"${_directory}"`);
  }

  const handleSubmit = () => {
    if(!name || !directory) {
      return;
    }

    const id = (scopeList?.length + 1) || 1;
    const scope: ScopeInterface = {
      id,
      name,
      description,
      directory,
      commands: []
    }

    addEscope(scope);
    closeModal();
  }

  return (
    <div className="w-96 bg-white rounded-md p-4">
      <h1
        className='text-2xl font-bold mb-2 text-center'
      >
        Adicionar Novo Escopo
      </h1>
      <Input
        label="Nome do Escopo"
        value={name}
        onChange={setName}
      />
      <Input
        label="Descrição do Escopo"
        value={description}
        type="text-area"
        onChange={setDescription}
      />
      <Input
        label="Diretorio do Escopo"
        value={directory}
        onChange={setDirectory}
        icon={<FcOpenedFolder
          className="cursor-pointer"
          size={24}
          onClick={() => getDirectory()}
        />}
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

export default ScopoForm
