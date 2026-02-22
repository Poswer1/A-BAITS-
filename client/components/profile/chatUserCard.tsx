import AvatarBlock from '../utils/avatar'
import { hoverCat } from '@/styles/categoryList'

export default function ChatUserCard() {
  return (
     <div className={`${hoverCat} flex justify-between items-start gap-2 cursor-pointer p-3 w-90 border-b border-gray-200`}>
        <div className='flex justify-center items-center gap-2'>
            {AvatarBlock('https://img.freepik.com/free-photo/successful-bearded-fisherman-standing-blue-wall-with-his-catch-having-happy-expression-handsome-young-man-holding-long-heavy-fish-hands-feeling-proud-excited_273609-8096.jpg?semt=ais_hybrid&w=740&q=80', '50')}
            <div className='flex flex-col justify-center items-start'>
                <h1>Могучее зерно</h1>
                <p className='text-gray-500 text-sm'>Новое сообщение nfrjt!</p>
            </div>
        </div>
        <span className='text-gray-500 text-sm'>3 часа назад</span>
    </div>
  )
}


