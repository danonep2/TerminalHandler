import { useRouter } from 'next/router';
import { useAppContext } from '../context/app.context';
import { ScopeInterface } from '../@types/scope';
import { MdModeEdit } from "react-icons/md";
import { useEffect, useState } from 'react';
import { delay } from '../utils/delay';

interface HomeCardProps {
  scope: ScopeInterface;
  openToEdit: (scope: ScopeInterface) => void
}

const HomeCard = ({ scope, openToEdit }: HomeCardProps) => {
  const router = useRouter();
  const { setScopeSelected } = useAppContext();

  const [effect, setEffect] = useState(false);

  const handleClick = () => {
    setScopeSelected(scope);
    router.push('/details')
  }

  useEffect(() => {
    const startEffect = async () => {
      await delay(100);
      setEffect(true);
    }

    startEffect();
  }, []);

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
      className={`w-[300px] h-[150px] rounded-md bg-[#f1f2f1] p-4 shadow-lg cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 relative
        ${effect ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}
        `}
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
        className='text-sm'
      >
        {scope.description || 'Sem descrição'}
      </p>

      <p
        className='text-xs font-bold absolute bottom-3 right-3'
      >
        Processos ativos: {getCommandsRunning()}
      </p>
    </div>
  )
}

export default HomeCard
