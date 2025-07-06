import React from 'react'
import HomeCard from '../components/HomeCard'
import { useAppContext } from '../context/app.context'


export default function HomePage() {
  const { scopeList } = useAppContext();

  return (
    <div
      className='bg-white/95 min-h-screen flex flex-col text-gray-600'
    >
      <h1 className='text-3xl font-bold  mt-10 text-center'>Terminal Handler</h1>

      <div className='w-screen p-10 flex flex-wrap m-10 mt-2 gap-4 self-center'>
        {scopeList && scopeList?.map((scope) => (
          <HomeCard key={scope.id} scope={scope} />
        ))
        }
      </div>

      <button>

      </button>
    </div>
  )
}
