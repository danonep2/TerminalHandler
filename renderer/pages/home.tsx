import React, { useState } from 'react'
import HomeCard from '../components/HomeCard'
import { useAppContext } from '../context/app.context'
import { AiOutlinePlus } from 'react-icons/ai';
import Modal from '../components/Modal';
import ScopoForm from '../components/ScopoForm';
import { ScopeInterface } from '../@types/scope';

export default function HomePage() {
  const { scopeList } = useAppContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scopeToEdit, setScopeToEdit] = useState<ScopeInterface>();

  return (
    <div
      className='bg-white/95 min-h-screen flex flex-col text-gray-600'
    >
      <h1 className='text-3xl font-bold  mt-10 text-center'>Terminal Handler</h1>

      <div className='w-screen p-10 flex flex-wrap m-10 mt-2 gap-4 self-center'>
        {scopeList && scopeList?.map((scope) => (
          <HomeCard
            key={scope.id}
            scope={scope}
            openToEdit={(scope) => {
              console.log(scope);
              setScopeToEdit(scope);
              setModalIsOpen(true);
            }}
          />
        ))
        }
      </div>

      <button
        className='btn-blue flex items-center gap-2 absolute right-2 top-4'
        onClick={() => setModalIsOpen(true)}
      >
        <AiOutlinePlus />
        Adicionar Escopo
      </button>

      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        onClose={() => setScopeToEdit(undefined)}
      >
        <ScopoForm
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
