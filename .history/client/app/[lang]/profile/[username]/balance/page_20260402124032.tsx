'use client'


function page() {
  const qrValue = `https://send.monobank.ua/3Y9bBHwR4q`;

  return (
    <div className='flex justify-start items-center w-full'>
      <div className='p-4 bg-white rounded-lg'>
        <h1 className='text-gray-500'>Текущий баланс: <br/><span className='text-black text-xl'>50 ₴</span></h1>
      </div>
    </div>
  )
}

export default page
