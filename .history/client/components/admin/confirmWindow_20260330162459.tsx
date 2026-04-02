import { useTranslation } from '@/app/context/TranslationProvider'
import { button, overlay } from '@/styles/global'
import { hover } from '@/styles/style'

interface ConfirmWindowProps {
    confirmAction: () => void
    cancelAction: () => void
    title:string
}

export default function ConfirmWindow({ confirmAction, cancelAction, title }: ConfirmWindowProps) {

    const {t} = useTranslation()

  return (
    <div className={overlay} onClick={(e) => cancelAction();}>
      <div className='flex flex-col justify-center items-center bg-white gap-5 p-10 w-1/3 rounded-xl'>
        <h1 className='text-xl'>{title}</h1>
        <div className='flex justify-center items-center w-full gap-5'>
            <span className={hover} onClick={cancelAction}>{t('admin', 'cancel')}</span>
            <button onClick={confirmAction} className={`${button} !p-2`}>{t('admin', 'confirm')}</button>
        </div>
      </div>
    </div>
  )
}

