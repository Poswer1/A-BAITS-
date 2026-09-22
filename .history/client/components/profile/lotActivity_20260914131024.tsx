'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import { lotListClass, pageContainerClass } from "@/styles/profile/profile"
import Sidebar from "./sidebar"
import { LotTypes } from "@/types/types"
import LotCardV2 from "../card/lotCardV2"
import Pagination from "../ui/pagination"
import { Archive, Edit2, RotateCcw, Trash2, X, XCircle } from "lucide-react"
import { hover } from "@/styles/style"
import { useEffect, useState } from "react"
import { closeLot, deleteLot, resumeLot } from "@/services/lot"
import Toast from "../ui/toast"
import ModalConfirm from "../ui/modalConfirm"
import SelectionField from "../ui/selectionField"
import { useRouter, useSearchParams } from "next/dist/client/components/navigation"
import MobileVersion from "../card/mobileVersion"

interface LotActivityProps {
    data:{ allLots: LotTypes[], totalLot: number }
    mode:string
    slug:string
}

export default function LotActivity({data, mode, slug}: LotActivityProps) {

    const {t} = useTranslation()
    const searchParams = useSearchParams()
    const router = useRouter()

    const [openConfirmWindow, setOpenConfirmWindow] = useState('')
    const [sortValue, setSortValue] = useState('')
    const [allLots, setAllLots] = useState(data.allLots || [])
    const [selectLot, setSelectLot] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const listFilter = [
      {
        name: 'PriceHigh',
        ru: 'Цена по убыванию',
        uk: 'Ціна за спаданням'
      },
      {
        name: 'PriceLow',
        ru: 'Цена по возрастанию',
        uk: 'Ціна за зростанням'
      },
      {
        name: 'Newest',
        ru: 'Сначала новые',
        uk: 'Спочатку нові'
      },
      {
        name: 'Oldest',
        ru: 'Сначала старые',
        uk: 'Спочатку старі'
      },
      {
        name: 'moreBids',
        ru: 'Больше ставок',
        uk: 'Більше ставок'
      },
      {
        name: 'lessBids',
        ru: 'Меньше ставок',
        uk: 'Менше ставок'
      }
    ];

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
    } else if (slug === 'Buying') {
      active = t('profile', 'buying')
    }

    useEffect(() => {
      if (data?.allLots) {
        setAllLots(data.allLots);
      }
    }, [data]);

    useEffect(() => {
      const params = new URLSearchParams(searchParams)
      if(sortValue) {
        params.set('sort', sortValue)
      }
      router.push(`?${params.toString()}`)
    }, [sortValue])

    const handleCloseLot = async () => {
      try {
        if(!selectLot) return
        await closeLot(selectLot)
        setAllLots(prev => prev.filter(l => l._id !== selectLot))
        setMessage(t('profile', 'lotSuccessArchive'))
        setTimeout(() => {
          setMessage('')
        }, 3000)
      } catch (error:any) {
        setError(t('profile', error.message || 'lotErrorArchive'))
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
      } catch (error:any) {
        setError(t('profile', error.message || 'errorDeleteLot'))
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
    <div className={`${pageContainerClass} min-h-0`}> 
       <h1 className="text-xl 2xl:text-2xl lg:text-xl p-2 py-4 md:p-0 md:mb-2">
        {mode === 'buy' ? t('profile', 'buy') : t('profile', 'sell')} | {slug === 'Active' ? t('profile', 'active') : slug === 'Archive' ? t('profile', 'archived') : slug === 'Completed' ? t('profile', 'completed') : t('profile', 'sold')} {t('global', 'lot')}
      </h1>
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <Sidebar mode={mode} active={active}/>
          <div className={lotListClass}>
            <div className="flex justify-between items-center w-full px-2 mb-2 md:p-0">
              <h1 className={openConfirmWindow ? 'hidden md:flex' : 'flex'}>{t('profile', 'LotsFound')}: {data?.totalLot}</h1>
              {(mode === 'sell' && allLots.length > 0 && active !== t('profile', 'sold')) && (
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
                    {(active === t('profile', 'archived') || active === t('profile', 'completed')) && (
                      <span onClick={() => setOpenConfirmWindow('resume')} className={`${styleButtonAction} bg-orange-600 text-white`}><RotateCcw size={20}/></span>
                    )}
                    {(active === t('profile', 'completed') || active === t('profile', 'active'))&& (
                      <span onClick={() => setOpenConfirmWindow('archive')} className={`${styleButtonAction} bg-red-500 text-white`}><Archive size={20}/></span>
                    )}
                    <span onClick={() => setOpenConfirmWindow('delete')} className={`${styleButtonAction} bg-red-500 text-white`}><Trash2 size={20}/></span>
                    </>
                  )}
                </div>
              )}
            </div>
            {allLots.length !== 0 && (
              <div className="w-[95%] px-2 md:w-1/5 mb-2 md:px-0">
                <SelectionField 
                title={''} 
                placeholder={t('profile', 'Sorting')} 
                list={listFilter} 
                setValue={setSortValue} 
                bgColor='bg-white'
                value={sortValue}/>
              </div>
            )}
            <MobileVersion lots={allLots} select={openConfirmWindow} selectLot={setSelectLot}/>
            <Pagination total={data?.totalLot || 0} maxLot={10}/>
          </div>
        </div>
        {(selectLot && openConfirmWindow !== 'edit') && (
          <ModalConfirm 
            handleClose={handleCloseModal} 
            handleAction={handleAction} 
            title={t('profile', openConfirmWindow)} 
            alert={t('profile', openConfirmWindow === 'archive' ? 'archiveDesc' : openConfirmWindow === 'delete' ? 'deleteDesc' : 'resumeDesc')}
            yesButton={t('profile', openConfirmWindow === 'archive' ? 'yesArchive' : openConfirmWindow === 'delete' ?  'yesDelete' : 'yesResume')}
          />
        )}
        <Toast message={message} error={error}/>
    </div>
  )
}

