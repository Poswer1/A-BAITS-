'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { animationScale, hover } from '@/styles/style'
import { LotTypes } from '@/types/types'
import { ChevronLeft, Edit2, RotateCcw, Search, Trash2, X, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import LotCardV2 from '../card/lotCardV2'

import { usePathname, useRouter } from 'next/navigation'
import SearchBlock from '../ui/search'
import TitleSection from './titleSection'
import ModalConfirm from '../ui/modalConfirm'
import { closeLot, deleteLot, resumeLot } from '@/services/lot'
import Toast from '../ui/toast'

interface LotsProps {
    lots: LotTypes[]
}

export default function Lots({lots}:LotsProps) {

    const {t} = useTranslation()
    const router = useRouter()
    const [allLots, setAllLots] = useState(lots)
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [actionOnTheLot, setActionOnTheLot] = useState('')

    const filterLots = allLots.filter(lot => lot.name.toLowerCase().includes(searchValue.toLowerCase()))

    useEffect(() => {
        const timer = setTimeout(() => {
        router.push(`?search=${encodeURIComponent(searchValue.toString())}`)
        }, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [searchValue])

    const handleCloseModal = () => {
        setActionOnTheLot('')
        setId('')
    }

    const handleCloseLot = async () => {
          try {
            if(!id) return
            const data = await closeLot(id)
            setMessage(t('profile', 'lotSuccessClose'))
            setTimeout(() => {
              setMessage('')
            }, 3000)
          } catch (error) {
            setError(t('profile', 'lotErrorClose'))
            setTimeout(() => {
              setError('')
            }, 3000)
          }
          handleCloseModal()
        }
        
        const handleDeleteLot = async () => {
          if(!id) return
          try {
            await deleteLot(id)
            setMessage(t('profile', 'successDeleteLot'))
            setAllLots(prev => prev.filter(l => l._id !== id))
            setTimeout(() => {
              setMessage('')
            }, 3000)
          } catch (error) {
            setError(t('profile', 'errorDeleteLot'))
            setTimeout(() => {
              setError('')
            }, 3000)
          }
          handleCloseModal()
        }
    
        const resume = async () => {
          if(!id) return
          try {
            await resumeLot(id)
            setMessage(t('profile', 'resumeSuccess'))
            setTimeout(() => {
              setMessage('')
            }, 3000)
          } catch (error) {
            setError(t('profile', 'resumeError'))
            setTimeout(() => {
              setError('')
            }, 3000)
          }
          handleCloseModal()
        }

    const handleAction = () => {
      if(actionOnTheLot === 'delete') {
        handleDeleteLot()
      } else if(actionOnTheLot === 'resume') {
        resume()
      } else {
        handleCloseLot()
      }
    }

    const styleButtonAction = `${hover} gap-1 flex p-2 rounded-md`

  return (
    <div className='flex flex-col w-full gap-2'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center w-full'>
            <TitleSection 
            title={edit ? t('admin', 'editLots') : t('admin', 'lots')} 
            searchValue={searchValue} 
            setSearchValue={setSearchValue} 
            placeholderSearch={t('admin', 'searchUser')}
            />
            <div className='flex justify-center items-center gap-3 z-150 p-2 md:p-0'>
                {actionOnTheLot ? (
                    <>
                        <span className="font-bold whitespace-nowrap">{t('profile', 'clickOnTheLot')}</span>
                        <span onClick={handleCloseModal} className={`${styleButtonAction}`}><X/></span>
                    </>
                ): (
                    <>
                        <span onClick={() => setActionOnTheLot('edit')} className={`${styleButtonAction} bg-white shadow-sm`}><Edit2 size={20}/></span>
                        <span onClick={() => setActionOnTheLot('resume')} className={`${styleButtonAction} bg-orange-600 text-white`}><RotateCcw size={20}/></span>
                        <span onClick={() => setActionOnTheLot('close')} className={`${styleButtonAction} bg-red-500 text-white`}><XCircle size={20}/></span>
                        <span onClick={() => setActionOnTheLot('delete')} className={`${styleButtonAction} bg-red-500 text-white`}><Trash2 size={20}/></span>
                    </>
                )}
            </div>
        </div>
        <div className="flex flex-col justify-start items-start">
            {filterLots.map((lot) => (
                <LotCardV2 key={lot._id} lot={lot} useFrom='admin' select={actionOnTheLot} selectLot={setId}/>
            ))}
        </div>
        {(id && actionOnTheLot !== 'edit') && (
            <ModalConfirm 
            handleClose={handleCloseModal} 
            handleAction={handleAction} 
            title={t('profile', actionOnTheLot)} 
            alert={t('profile', actionOnTheLot === 'close' ? 'closeDesc' : actionOnTheLot === 'delete' ? 'deleteDesc' : 'resumeDesc')}
            yesButton={t('profile', actionOnTheLot === 'close' ? 'yesClose' : actionOnTheLot === 'delete' ?  'yesDelete' : 'yesResume')}
            />
        )} 
        <Toast message={message} error={error}/>
    </div>
  )
}

