'use client'

import { useState } from "react"

function ShowCard() {

 const [stateCard, setStateCard] = useState('Tile')

  return (
     <div className='flex justify-start items-center text-black gap-2'>
            <span onClick={() => setStateCard('Tile')} className={`${animate} ${stateCard === 'Tile' && 'bg-orange-600/10 text-orange-600'} flex justify-center items-center p-2 bg-gray-100 rounded-md`}>
              <LayoutGrid size={18}/>
            </span>
            <span onClick={() => setStateCard('Grid')} className={`${animate} ${stateCard === 'Grid' && 'bg-orange-600/10 text-orange-600'} flex justify-center items-center p-2 bg-gray-100 rounded-md`}>
              <Rows3 size={18}/>
            </span>
          </div>
  )
}

export default ShowCard
