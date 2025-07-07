import { useRouter } from 'next/router';
import { useAppContext } from '../context/app.context';
import { ScopeInterface } from '../@types/scope';
import { MdModeEdit } from "react-icons/md";
import { useState } from 'react';

interface HomeCardProps {
  scope: ScopeInterface;
  openToEdit: (scope: ScopeInterface) => void
}

const HomeCard = ({ scope, openToEdit }: HomeCardProps) => {
  const router = useRouter();
  const { setScopeSelected } = useAppContext();

  const [scopeToEdit, setScopeToEdit] = useState<ScopeInterface>();

  const handleClick = () => {
    setScopeSelected(scope);
    router.push('/details')
  }

  const getCommandsRunning = () => {
    const { commands } = scope;

    return commands.reduce((total, command) => {
      if (command.isRunning) {
        return total + 1;
      }
      return total;
    }, 0);
  }

  const edit = (event) => {
    event.stopPropagation();
    openToEdit(scope);
  }

  return (
    <div
      className='w-[300px] h-[150px] rounded-md bg-white p-4 shadow-lg cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 flex flex-col relative'
      onClick={handleClick}
    >
      <MdModeEdit
        size={24}
        className="hover:bg-gray-200 rounded-full transition-all ease-in-out duration-300 absolute right-2 top-3 cursor-pointer"
        onClick={edit}
      />
      <h2
        className="font-bold text-lg"
      >{scope.name}</h2>
      <p
        className='text-sm truncate'
      >
        {scope.description || 'Sem descrição'}
      </p>

      <p
        className='text-xs font-bold self-end mt-11'
      >
        Processos ativos: {getCommandsRunning()}
      </p>
    </div>
  )
}

export default HomeCard
