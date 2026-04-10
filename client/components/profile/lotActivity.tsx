'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { lotListClass, pageContainerClass } from "@/styles/profile/profile"
import Sidebar from "./sidebar"
import { LotTypes } from "@/types/types"
import LotCardV2 from "../card/lotCardV2"
import Pagination from "../ui/pagination"
import { AlertCircle, Edit2, RotateCcw, Trash2, X, XCircle } from "lucide-react"
import { animationScale, hover } from "@/styles/style"
import { useState } from "react"
import { overlay } from "@/styles/global"
import { closeLot, deleteLot, resumeLot } from "@/services/lot"
import Toast from "../ui/toast"
import ModalConfirm from "../ui/modalConfirm"

interface LotActivityProps {
    data:{ allLots: LotTypes[], totalLot: number }
    mode:string
    slug:string
}

export default function LotActivity({data, mode, slug}: LotActivityProps) {

    const {t} = useTranslation()
    const [openConfirmWindow, setOpenConfirmWindow] = useState('')
    const [allLots, setAllLots] = useState(data.allLots || [])
    const [selectLot, setSelectLot] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    let active = ''

    if(slug === 'Active') {
      active = t('profile', 'active')
    } else if(slug === 'Archive') {
      active = t('profile', 'archived')
    } else if(slug === 'Favorite') {
      active = t('profile', 'favorites')
    } else if(slug === 'Completed') {
      active = t('profile', 'completed')
    } else if(slug === 'Sold') {
      active = t('profile', 'sold')
    }

    const handleCloseLot = async () => {
      try {
        if(!selectLot) return
        const data = await closeLot(selectLot)
        setAllLots(prev => prev.map(l => l._id === selectLot ? 
          { ...l, status: data.status }
          : l
        ))
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
      if(!selectLot) return
      try {
        await deleteLot(selectLot)
        setAllLots(prev => prev.filter(l => l._id !== selectLot))
        setMessage(t('profile', 'successDeleteLot'))
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
      if(!selectLot) return
      try {
        await resumeLot(selectLot)
        setAllLots(prev => prev.filter(l => l._id !== selectLot))
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

    const handleCloseModal = () => {
      setOpenConfirmWindow(''), 
      setSelectLot('')
    }

    const handleAction = () => {
      if(openConfirmWindow === 'delete') {
        handleDeleteLot()
      } else if(openConfirmWindow === 'resume') {
        resume()
      } else {
        handleCloseLot()
      }
    }

    const styleButtonAction = `${hover} gap-1 flex p-2 rounded-md`

  return (
    <div className={pageContainerClass}> 
        <h1 className="text-xl 2xl:text-2xl lg:text-xl p-2 py-4 md:p-0 md:mb-2">{mode === 'buy' ? t('profile', 'buy') : t('profile', 'sell')} | {slug === 'active' ? t('profile', 'active') : slug === 'archive' ? t('profile', 'archived') : slug === 'completed' ? t('profile', 'completed') : t('profile', 'sold')} {t('global', 'lot')}</h1>
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <Sidebar mode={mode} active={active}/>
          <div className={lotListClass}>
            <div className="flex justify-between items-center w-full px-2 mb-4 md:p-0">
              <h1 className={openConfirmWindow ? 'hidden md:flex' : 'flex'}>{t('profile', 'LotsFound')}: {data?.totalLot}</h1>
              {(mode === 'sell' && allLots.length > 0 && (active === t('profile', 'archived') || active === t('profile', 'active'))) && (
                <div className={`${openConfirmWindow ? 'w-full md:w-auto': 'w-auto'} flex justify-between items-center gap-2`}>
                  {openConfirmWindow ? (
                    <>
                    <span className="font-bold">{t('profile', 'clickOnTheLot')}</span>
                    <span onClick={handleCloseModal} className={`${styleButtonAction}`}><X /></span>
                    </>
                  ): (
                    <>
                    {active === t('profile', 'active') && (
                      <span onClick={() => setOpenConfirmWindow('edit')} className={`${styleButtonAction} bg-white shadow-sm`}><Edit2 size={20}/></span>
                    )}
                    {active === t('profile', 'archived') ? (
                      <span onClick={() => setOpenConfirmWindow('resume')} className={`${styleButtonAction} bg-orange-600 text-white`}><RotateCcw size={20}/></span>
                    ): (
                     <span onClick={() => setOpenConfirmWindow('close')} className={`${styleButtonAction} bg-red-500 text-white`}><XCircle size={20}/></span>
                    )}
                    <span onClick={() => setOpenConfirmWindow('delete')} className={`${styleButtonAction} bg-red-500 text-white`}><Trash2 size={20}/></span>
                    </>
                  )}
                </div>
              )}
            </div>

            {allLots.map((lot:any) => (
              <LotCardV2 lot={lot} show={true} select={openConfirmWindow} selectLot={setSelectLot}/> 
            ))}
            <Pagination total={data?.totalLot || 0} maxLot={10}/>
          </div>
        </div>
        {(selectLot && openConfirmWindow !== 'edit') && (
          <ModalConfirm 
            handleClose={handleCloseModal} 
            handleAction={handleAction} 
            title={t('profile', openConfirmWindow)} 
            alert={t('profile', openConfirmWindow === 'close' ? 'closeDesc' : openConfirmWindow === 'delete' ? 'deleteDesc' : 'resumeDesc')}
            yesButton={t('profile', openConfirmWindow === 'close' ? 'yesClose' : openConfirmWindow === 'delete' ?  'yesDelete' : 'yesResume')}
          />
        )}
        <Toast message={message} error={error}/>
    </div>
  )
}

