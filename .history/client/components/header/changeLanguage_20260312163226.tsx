import React from 'react'

export default function changLanguage() {
  return (
    <div onClick={() => setOpenLanguage(prev => !prev)}className='flex justify-center items-center gap-2 cursor-pointer relative '>
                            <Globe />
                                {pathname === '/uk' ? 'Українська' : 'Русский'}
                                <ChevronDown  className={arrowActive(openLanguage)}/>
                                {openLanguage && (
                                    <div ref={modalRef} onClick={(e) => e.stopPropagation()} className='w-full p-2 absolute top-[100%] flex flex-col justify-center items-start z-10 bg-white text-black rounded-xl gap-2'>
                                        <Link href={'/ru'} className={hover} onClick={() => setOpenLanguage(false)}>Русский</Link>
                                        <Link href={'/uk'} className={hover} onClick={() => setOpenLanguage(false)}>Українська</Link>
                                    </div>
                            )}
                        </div>
  )
}

