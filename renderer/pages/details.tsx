import { useRouter } from 'next/router';
import { useAppContext } from '../context/app.context';
import { Rnd } from 'react-rnd';
import { CommandInterface } from '../@types/command';
import { useState } from 'react';
import {
  AiOutlineArrowLeft,
  AiOutlinePlus
} from "react-icons/ai";
import { TbPlaylistX, TbReload, TbTerminal2  } from "react-icons/tb";
import CommandItemList from '../components/CommandItemList';
import Modal from '../components/Modal';
import CommandForm from '../components/CommandForm';
import { FaUnlock, FaLock  } from "react-icons/fa";

const DetailsPage = () => {
  const router = useRouter()
  const {
    scopeSelected,
    setScopeSelected,
    openInTerminal,
    cleanOutput
  } = useAppContext();

  const [commandSelected, setCommandSelected] = useState<CommandInterface>();
  const [autoScroll, setAutoScroll] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [commandToEdit, setCommandToEdit] = useState<CommandInterface>();

  const back = () => {
    setScopeSelected(undefined);
    router.back();
  }

  const openToEdit = (command: CommandInterface) => {
    setCommandToEdit(command);
    setModalIsOpen(true);
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
                onClick={() => setModalIsOpen(true)}
              >
                <AiOutlinePlus />
                Adicionar Comando
              </button>
            </div>

            {scopeSelected?.commands?.map((command) => (
              <CommandItemList
                key={command.id_command}
                editCommand={openToEdit}
                command={command}
                selectCommand={() => setCommandSelected(command)}
                isSelected={command.id_command === commandSelected?.id_command}
              />
            ))}

          </div>
        </Rnd>

        <div
          className="max-h-100 bg-gray-950 w-full h-full relative rounded-lg text-white"
        >
          <div
            className='px-4 py-3 h-14 border-b text-sm w-full flex justify-between items-center'
          >
            <p
              className="text-wrap"
            >
              {commandSelected?.description || 'Sem descrição'}
            </p>
            <div
              className="flex items-center gap-2"
            >
              {autoScroll
                ? <FaLock
                  size={20}
                  title="Desligar Auto Scroll"
                  onClick={() => setAutoScroll(false)}
                  className="cursor-pointer hover:scale-105 transition-all ease-out duration-200
                  hover:text-[green]"
                />
                : <FaUnlock
                  size={20}
                  title="Ligar Auto Scroll"
                  onClick={() => setAutoScroll(true)}
                  className="cursor-pointer hover:scale-105 transition-all ease-out duration-200
                  hover:text-[green]"
                />
              }
              {commandSelected?.isRunning && <TbReload
                size={22}
                title="Reiniciar Comando"
                className="cursor-pointer hover:scale-105 transition-all ease-out duration-200
                hover:text-blue-300"
              />}
              <TbPlaylistX
                size={28}
                title="Limpar Saida"
                onClick={() => cleanOutput(commandSelected)}
                className="cursor-pointer hover:scale-105 transition-all ease-out duration-200
                hover:text-[red]"
              />
              <TbTerminal2
                size={22}
                title="Abrir no terminal"
                onClick={openInTerminal}
                className="cursor-pointer hover:scale-105 transition-all ease-out duration-200
                hover:text-[yellow]"
              />
            </div>
          </div>
          <div
            className="text-wrap overflow-y-auto max-w-full
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar]:p-0.5
              [&::-webkit-scrollbar-track]:opacity-0
              [&::-webkit-scrollbar-thumb]:bg-gray-300
              [&::-webkit-scrollbar-thumb]:rounded-md
              w-full h-[calc(100%-64px)] relative rounded-lg p-4"
          >
            <pre
              className="text-wrap"
            >
              {commandSelected?.output || ""}
            </pre>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        onClose={() => setCommandToEdit(undefined)}
        >
        <CommandForm
          command={commandToEdit}
          closeModal={() => {
            setModalIsOpen(false)
            setCommandToEdit(undefined)
            setCommandSelected(undefined)
          }}
        />
      </Modal>
    </div>
  )
}

export default DetailsPage;
