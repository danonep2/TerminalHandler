import { useRouter } from 'next/router';
import { useAppContext } from '../context/app.context';
import { ScopeInterface } from '../@types/scope';

interface HomeCardProps {
  scope: ScopeInterface
}

const HomeCard = ({ scope }: HomeCardProps) => {
  const router = useRouter();
  const { setScopeSelected } = useAppContext();

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

  return (
    <div
      className='w-[300px] h-[150px] rounded-md bg-white p-4 shadow-lg cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 flex flex-col'
      onClick={handleClick}
    >
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
