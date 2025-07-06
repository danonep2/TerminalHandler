import { useRouter } from 'next/router';
import { useAppContext } from '../context/app.context';
import { Rnd } from 'react-rnd';
import { CommandInterface } from '../@types/command';
import { useRef, useState } from 'react';
import {
  AiOutlineArrowLeft,
  AiOutlinePlus
} from "react-icons/ai";
import CommandItemList from '../components/CommandItemList';

const DetailsPage = () => {
  const router = useRouter()
  const { scopeSelected, setScopeSelected } = useAppContext();

  const [commandSelected, setCommandSelected] = useState<CommandInterface>();

  const saidaRef = useRef<HTMLDivElement>(null);

  const back = () => {
    setScopeSelected(undefined);
    router.back();
  }

  return (
    <div
      className='bg-white/95 min-h-screen text-gray-600 p-5 h-full'
    >
      <div
        className="flex items-center cursor-pointer "
        onClick={back}
      >
        <AiOutlineArrowLeft
          size={20}
          className='text-xs font-boldmr-0.5'
        />
        Voltar
      </div>

      <h1 className='text-3xl font-bold mt-2'>Escopo: {scopeSelected?.name}</h1>
      <p className='text-sm'>{scopeSelected?.description}</p>

      <div className="flex mt-3 w-full h-[80vh] gap-2">
        <Rnd
          default={{
            x: 0,
            y: 0,
            width: '30%',
            height: '100%',
          }}
          disableDragging
          style={{ position: 'relative' }}
          enableResizing={{
            right: true,
          }}
          minWidth={200}
          className="bg-white w-full h-full border border-gray-500 rounded-lg"
        >
          <div className="w-full h-full p-4 relative flex flex-col gap-3">
            <div className="flex flex-wrap justify-between mb-3">
              <h1
                className='text-2xl font-bold mb-2'
              >Comandos cadastrados</h1>
              <button
                className='btn-blue flex items-center gap-2 w-100'
              >
                <AiOutlinePlus />
                Adicionar Comando
              </button>
            </div>

            {scopeSelected?.commands?.map((command) => (
              <CommandItemList
                key={command.id_command}
                command={command}
                selectCommand={() => setCommandSelected(command)}
                isSelected={command.id_command === commandSelected?.id_command}
              />
            ))}

          </div>
        </Rnd>

        <div
          className="max-h-100 overflow-y-auto
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar]:p-0.5
          [&::-webkit-scrollbar-track]:opacity-0
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          [&::-webkit-scrollbar-thumb]:rounded-md
          bg-gray-950 w-full h-full max-h-[80vh] overflow-auto relative rounded-lg text-white p-4"
        >
          <pre>
            {commandSelected?.output || ""}
          </pre>
        </div>
      </div>

    </div>
  )
}

export default DetailsPage;
