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
  const [name, setName] = useState(scope?.name || '');
  const [description, setDescription] = useState(scope?.description || '');
  const [directory, setDirectory] = useState(scope?.directory || '');

  const {
    removeScope,
    addEscope,
    scopeList,
    editEscope
  } = useAppContext();

  const getDirectory = async () => {
    // @ts-ignore
    const _directory = await window.api.selecionarPasta();

    if(!_directory) {
      return;
    }

    setDirectory(`"${_directory}"`);
  }

  const handleSubmit = () => {
    if(!name || !directory) {
      return;
    }

    if(scope){
      _editScope();
    } else {
      newScope();
    }

    closeModal();
  }

  const newScope = () => {
    const id = (scopeList?.length + 1) || 1;
    const newScope: ScopeInterface = {
      id,
      name,
      description,
      directory,
      commands: []
    }

    addEscope(newScope);
  }

  const _editScope = () => {
    scope.name = name;
    scope.description = description;
    scope.directory = directory;

    editEscope(scope);
  }

  const handleDelete = () => {
    if (scope) {
      removeScope(scope);
    }

    closeModal();
  }

  return (
    <div className="w-96 bg-white rounded-md p-4">
      <h1
        className='text-2xl font-bold mb-2 text-center'
      >
        {
          scope ? 'Editar Escopo' : 'Adicionar Novo Escopo'}
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
        {scope ? 'Salvar' : 'Adicionar'}
      </button>
      {scope &&
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

export default ScopoForm
