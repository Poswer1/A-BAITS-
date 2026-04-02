import React from 'react'

export default function Balance() {
  return (
     <div className={blockClass}>
      <div className='p-1 bg-white rounded-lg flex justify-between items-center w-full'>
        <h1 className='text-gray-500'>Текущий баланс: <br/><span className='text-black text-xl'>50 ₴</span></h1>
        <button onClick={() => setOpenQe(true)} className={`${button}`}><DollarSign />Пополнить баланс</button>
      </div>
      {openQr && (
        <div className={overlay}>
          <div className='flex justify-center items-center p-10 w-1/3 bg-white rounded-xl'>
          </div>
        </div>
      )}
    </div>
  )
}

