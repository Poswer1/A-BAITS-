import { useTranslation } from '@/app/context/TranslationProvider'
import { button, overlay } from '@/styles/global'

interface ConfirmWindowProps {
    confirmAction: () => void
    cancelAction: () => void
    title:string
}

export default function ConfirmWindow({ confirmAction, cancelAction, title }: ConfirmWindowProps) {

    const {t} = useTranslation()

  return (
    <div className={overlay}>
      <div className='flex flex-col justify-center items-center bg-white p-10 w-1/3 rounded-xl'>
        <h1>Вы уверены что хотите сделать это действие?</h1>
        <div className='flex justify-center items-center w-full'>
            <span>{t('admin', 'cancel')}</span>
            <button className={`${button} !p-2`}>{t('admin', 'confirm')}</button>
        </div>
      </div>
    </div>
  )
}

