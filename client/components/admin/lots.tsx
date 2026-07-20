'use client'

import { useTranslation } from '@/app/context/TranslationProvider'
import { animationScale, hover } from '@/styles/style'
import { LotTypes } from '@/types/types'
import { Archive, ArrowDown, ArrowUp, ArrowUpDown, Edit2, RotateCcw, Search, Trash2, X, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import LotCardV2 from '../card/lotCardV2'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SearchBlock from '../ui/search'
import TitleSection from './titleSection'
import ModalConfirm from '../ui/modalConfirm'
import { closeLot, deleteLot, resumeLot } from '@/services/lot'
import Toast from '../ui/toast'
import Pagination from '../ui/pagination'

interface LotsProps {
    lots: LotTypes[]
    total: number
    currentPage: number
    currentSort: string
    currentOrder: string
    currentStatus: string
}

export default function Lots({lots, total, currentPage, currentSort, currentOrder, currentStatus}:LotsProps) {

    const {t} = useTranslation()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [allLots, setAllLots] = useState(lots)
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [actionOnTheLot, setActionOnTheLot] = useState('')

    useEffect(() => {
        setAllLots(lots)
    }, [lots])

    const updateUrl = (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams)
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value)
        else params.delete(key)
      })
      router.push(`${pathname}?${params.toString()}`)
    }

    const handleSort = (field: string) => {
      const newOrder = currentSort === field && currentOrder === 'desc' ? 'asc' : 'desc'
      updateUrl({ sort: field, order: newOrder, page: '1' })
    }

    const handleStatusFilter = (status: string) => {
      updateUrl({ status: currentStatus === status ? '' : status, page: '1' })
    }

    const handleSearch = (value: string) => {
      setSearchValue(value)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
          updateUrl({ search: searchValue, page: '1' })
        }, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [searchValue])

    const SortIcon = ({ field }: { field: string }) => {
      if (currentSort !== field) return <ArrowUpDown size={14} className="text-gray-400"/>
      return currentOrder === 'asc' ? <ArrowUp size={14} className="text-orange-600"/> : <ArrowDown size={14} className="text-orange-600"/>
    }

    const handleCloseModal = () => {
        setActionOnTheLot('')
        setId('')
    }

    const handleCloseLot = async () => {
          try {
            if(!id) return
            const data = await closeLot(id)
            setAllLots(prev => prev.filter(l => l._id !== id))
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

    const sortButtonClass = `${hover} flex items-center gap-1 px-3 py-1 rounded-md bg-white text-sm whitespace-nowrap shadow-sm`
    
    const statusTabs = [
      { label: t('admin', 'lotActive') || 'Активные', value: 'Active' },
      { label: t('admin', 'lotCompleted') || 'Завершенные', value: 'Completed' },
      { label: t('admin', 'lotSold') || 'Проданные', value: 'Sold' },
      { label: t('admin', 'lotArchive') || 'Архив', value: 'Archive' },
    ]

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
                       <span onClick={() => setActionOnTheLot('archive')} className={`${styleButtonAction} bg-red-500 text-white`}><Archive size={20}/></span>
                        <span onClick={() => setActionOnTheLot('delete')} className={`${styleButtonAction} bg-red-500 text-white`}><Trash2 size={20}/></span>
                    </>
                )}
            </div>
        </div>
        <div className="flex flex-wrap gap-2 px-2 md:px-0">
          <button 
            onClick={() => handleStatusFilter('')} 
            className={`${hover} px-4 py-1.5 rounded-md text-sm font-medium transition-all ${!currentStatus ? 'bg-orange-600 text-white' : 'bg-white text-black shadow-sm'}`}
          >
            {t('admin', 'lotAll') || 'Все'}
          </button>
          {statusTabs.map(tab => (
            <button 
              key={tab.value}
              onClick={() => handleStatusFilter(tab.value)} 
              className={`${hover} px-4 py-1.5 rounded-md text-sm font-medium transition-all ${currentStatus === tab.value ? 'bg-orange-600 text-white' : 'bg-white text-black shadow-sm'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Sort Buttons */}
        <div className="flex flex-wrap gap-2 px-2 md:px-0">
          <button onClick={() => handleSort('name')} className={sortButtonClass}>
            Название <SortIcon field="name"/>
          </button>
          <button onClick={() => handleSort('createdAt')} className={sortButtonClass}>
            Дата <SortIcon field="createdAt"/>
          </button>
          <button onClick={() => handleSort('startPrice')} className={sortButtonClass}>
            Цена <SortIcon field="startPrice"/>
          </button>
          <button onClick={() => handleSort('status')} className={sortButtonClass}>
            Статус <SortIcon field="status"/>
          </button>
        </div>
        <div className="flex flex-col justify-start items-start">
            {allLots.map((lot) => (
             <LotCardV2 lot={lot} useFrom='admin' select={actionOnTheLot} selectLot={setId}/>
            ))}
        </div>
        <Pagination total={total} maxLot={20}/>
        {(id && actionOnTheLot !== 'edit') && (
            <ModalConfirm 
            handleClose={handleCloseModal} 
            handleAction={handleAction} 
            title={t('profile', actionOnTheLot)} 
            alert={t('profile', actionOnTheLot === 'archive' ? 'archiveDesc' : actionOnTheLot === 'delete' ? 'deleteDesc' : 'resumeDesc')}
            yesButton={t('profile', actionOnTheLot === 'archive' ? 'yesArchive' : actionOnTheLot === 'delete' ?  'yesDelete' : 'yesResume')}
            />
        )} 
        <Toast message={message} error={error}/>
    </div>
  )
}

