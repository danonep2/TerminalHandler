'use client'

import { useRouter } from 'next/router';
import { useAppContext } from '../context/app.context';
import { Rnd } from 'react-rnd';
import { CommandInterface } from '../@types/command';
import { useEffect, useRef, useState } from 'react';
import {
  AiOutlineArrowLeft,
  AiOutlinePlus
} from "react-icons/ai";
import {
  TbPlaylistX,
  TbReload,
  TbTerminal2,
  TbCopy
} from "react-icons/tb";
import CommandItemList from '../components/CommandItemList';
import Modal from '../components/Modal';
import CommandForm from '../components/CommandForm';
import { FaUnlock, FaLock  } from "react-icons/fa";

const DetailsPage = () => {
  const router = useRouter()
  const {
    scopeSelected,
    scopeList,
    setScopeSelected,
    openInTerminal,
    cleanOutput,
    restartProcess
  } = useAppContext();

  const [commandSelected, setCommandSelected] = useState<CommandInterface>();
  const [autoScroll, setAutoScroll] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [commandToEdit, setCommandToEdit] = useState<CommandInterface>();

  const outRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(!scopeSelected){
      back();
    }
  }, []);

  useEffect(() => {
    if(!autoScroll && commandSelected.isRunning){
      return;
    }

    outRef.current?.scrollTo({
      top: outRef.current?.scrollHeight,
    });
  },[ scopeList, autoScroll, commandSelected]);

  const back = () => {
    setScopeSelected(undefined);
    router.back();
  }

  const openToEdit = (command: CommandInterface) => {
    setCommandToEdit(command);
    setModalIsOpen(true);
  }

  const copyOutut = (command: CommandInterface) => {
    navigator.clipboard.writeText(command.output);
  }

  if(!scopeSelected) {
    return null;
  }

  return (
    <div
      className='min-h-screen text-gray-600 p-5 h-full'
    >
      <div
        className="flex items-center cursor-pointer dark:text-white"
        onClick={back}
      >
        <AiOutlineArrowLeft
          size={20}
          className='text-xs font-boldmr-0.5'
        />
        Voltar
      </div>

      <h1 className='text-3xl font-bold mt-2 dark:text-white'>Escopo: {scopeSelected?.name}</h1>
      <p className='text-sm dark:text-white'>{scopeSelected?.description}</p>

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
          className="w-full h-full pb-1 border border-gray-500 rounded-lg bg-white dark:bg-opacity-0"
        >
          <div className="w-full h-full relative flex flex-col pr-1">
            <div className="flex flex-wrap justify-between p-4">
              <h1
                className='text-2xl font-bold mb-2 dark:text-white mr-4'
              >Comandos cadastrados</h1>
              <button
                className='btn-blue flex items-center gap-2 w-100'
                onClick={() => setModalIsOpen(true)}
              >
                <AiOutlinePlus />
                Adicionar Comando
              </button>
            </div>

            <div
              className="
              h-full overflow-y-scroll
              flex-col flex gap-2
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar]:p-0.5
              [&::-webkit-scrollbar-track]:opacity-0
              [&::-webkit-scrollbar-thumb]:bg-gray-300
              [&::-webkit-scrollbar-thumb]:rounded-md px-2 pb-5
              "
            >
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
              <TbCopy
                size={22}
                title="Copiar Saida"
                onClick={() => copyOutut(commandSelected)}
                className="cursor-pointer hover:scale-105 transition-all ease-out duration-200
                hover:text-blue-300"
              />
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
                onClick={() => restartProcess(commandSelected)}
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
              ref={outRef}
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
