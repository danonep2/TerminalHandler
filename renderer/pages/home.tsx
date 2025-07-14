import React, { useState } from 'react'
import HomeCard from '../components/HomeCard'
import { useAppContext } from '../context/app.context'
import { AiOutlineBorder, AiOutlinePlus } from 'react-icons/ai';
import Modal from '../components/Modal';
import ScopeForm from '../components/ScopeForm';
import { ScopeInterface } from '../@types/scope';
import SwitchDark from '../components/SwitchDark';

export default function HomePage() {
  const { scopeList } = useAppContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scopeToEdit, setScopeToEdit] = useState<ScopeInterface>();

  return (
    <div
      className='min-h-screen flex flex-col '
    >
      <h1 className='text-3xl font-bold  mt-10 text-center dark:text-white transition-all ease-in-out duration-300'>Terminal Handler</h1>

      <div className='w-screen p-10 flex flex-wrap m-10 mt-2 gap-4 self-center'>
        {scopeList && scopeList?.map((scope) => (
          <HomeCard
            key={scope.id}
            scope={scope}
            openToEdit={(scope) => {
              setScopeToEdit(scope);
              setModalIsOpen(true);
            }}
          />
        ))
        }
      </div>

      <div
        className="absolute right-2 top-4 flex flex-col gap-1"
      >
        <button
          className='btn-blue flex items-center gap-1 hover:bg-[red] transition-all ease-in-out duration-300'
          onClick={() => window.api.killAllHandles()}
          >
            <AiOutlineBorder />
            Parar todos os comandos
        </button>
        <div
          className="flex justify-between items-center"
        >
          <SwitchDark />

          <button
            className='ml-1 btn-blue flex items-center gap-0.5'
            onClick={() => setModalIsOpen(true)}
            >
            <AiOutlinePlus />
            Adicionar escopo
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        onClose={() => setScopeToEdit(undefined)}
      >
        <ScopeForm
          scope={scopeToEdit}
          closeModal={() => {
            setScopeToEdit(undefined);
            setModalIsOpen(false);
          }}
        />
      </Modal>
    </div>
  )
}
