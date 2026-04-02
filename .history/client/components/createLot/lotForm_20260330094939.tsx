'use client'

import { useTranslation } from "@/app/context/TranslationProvider"
import AutoReExtension from "@/components/createLot/checkBoxSections"
import DateSections from "@/components/createLot/dateSections"
import DescriptionSections from "@/components/createLot/descriptionSections"
import LocationSections from "@/components/createLot/locationSections"
import MainInfoSections from "@/components/createLot/mainInfoSections"
import PhotoSections from "@/components/createLot/photoSections"
import PriceSections from "@/components/createLot/priceSections"
import StateSections from "@/components/createLot/stateSections"
import Summary from "@/components/createLot/summary"
import CategoryList from "@/components/header/CategoryList"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { hover } from "@/styles/style"
import { createLot, updateLot } from "@/services/lot"
import Loading from "@/components/ui/loadig"
import { getStatusAuth } from "@/services/auth"
import { useParams, useRouter } from "next/navigation"
import { loadingBlock } from "@/styles/global"
import Success from "@/components/ui/success"
import { getValueByLang } from "@/utils/translateValue"
import { categoriesWithIcons } from "@/category/category"
import { LotTypes } from "@/types/types"

interface LotFormProps {
mode: 'create' | 'edit' | 'editAdmin',
initialData?: LotTypes
}

interface Images

export default function LotForm({mode, initialData}:LotFormProps) {

    const {t} = useTranslation()
    const router = useRouter()
    const params = useParams()
    const lang = params.lang as string

    const [name, setName] = useState(initialData?.name || '')
    const [description, setDescription] = useState(initialData?.descriptions || '')
    const [stateLot, setStateLot] = useState(initialData?.state || '')
    const [price, setPrice] = useState(1)
    const [priceStep, setPriceStep] = useState(initialData?.stepPrice || 1)
    const [blitzPrice, setBlitzPrice] = useState(initialData?.blitzPrice || 1)
    const [date, setDate] = useState(initialData?.date || 0)
    const [time, setTime] = useState(initialData?.dateTime || '21:00')
    const [location, setLocation] = useState(initialData?.location || '')
    const [delivery, setDelivery] = useState(initialData?.delivary || '')
    const [autoReExtension, setAutoReExtensio] = useState(initialData?.autoReExtension || false)
    const [advertising, setAdvertising] = useState(initialData?.Advertising || false)
    const [file, setFile] = useState<File[]>([])
    const [image, setImage] = useState
    const [preview, setPreview] = useState<string[]>(initialData?.images || [])
    const [category, setCategory] = useState(initialData?.category || '')
    const [subCategory, setSubCategory] = useState(initialData?.subCategory || '')
    const [subSubCategory, setSubSubCategory] = useState(initialData?.subSubCategory || '')
    const [message, setMessage] = useState('')

    const [openCategory, setOpenCategory] = useState(false)
    const [confirmCreateOrder, setConfirmCreateOrder] = useState(false)
    const [loading, setLoading] = useState(true)


    const activeCategory = categoriesWithIcons.find(obg => obg.name === category)
    
    const transleteCategory = getValueByLang(categoriesWithIcons, category, lang)
    const transleteSubCategory = getValueByLang(activeCategory?.subcategories || [], subCategory, lang)
    const transleteSubSubCategory = getValueByLang(activeCategory?.subcategories?.find(sc => sc.name === subCategory)?.subcategories || [], subSubCategory, lang)

    useEffect(() => {
      const checkAuth = async () => {
        const isAuth = await getStatusAuth()

        if (!isAuth) {
          router.push('/auth/login')
        }
        setLoading(false)
      }

      checkAuth()
    }, [])


    const handleClear = () => {
      setName('')
      setDescription('')
      setPrice(0)
      setPriceStep(0)
      setBlitzPrice(0)
      setDate(0)
      setTime('')
      setLocation('')
      setDelivery('')
      setAutoReExtensio(false)
      setAdvertising(false)
      setFile([])
      setCategory('')
      setSubCategory('')
      setSubSubCategory('')
      setPreview([])
    }

    const handleCreateOrUpdate = async () => {
       if (!name || !description || !stateLot || !location || !delivery || !price || !priceStep || !date || !time || !file || file.length === 0 || !category) {
          setMessage('Будь ласка, заповніть всі дані')
          setTimeout(() => {
            setMessage('')
          }, 3000)
          return
        }

      if(name.length > 70) {
        setMessage(t('createLot', 'createLot-nameInput'))
        setTimeout(() => {
            setMessage('')
          }, 3000)
          return
      }

      if(description.length > 1200) {
        setMessage(t('createLot', 'createLot-lengthdescriptions'))
        setTimeout(() => {
            setMessage('')
          }, 3000)
          return
      }

        setLoading(true)

        const formData = new FormData()

        formData.append('name', name)
        formData.append('startPrice', price.toString())
        formData.append('category', category)
        formData.append('subCategory', subCategory)
        if(subSubCategory)formData.append('subSubCategory', subSubCategory)
        formData.append('stepPrice', priceStep.toString())
        if (blitzPrice)formData.append('blitzPrice', blitzPrice.toString())
        if(autoReExtension)formData.append('autoReExtension', autoReExtension.toString())  
        formData.append('descriptions', description)
        formData.append('state', stateLot)
        formData.append('date', date.toString())
        formData.append('dateTime', time)
        formData.append('location', location)
        formData.append('delivary', delivery)
        if(advertising)formData.append('Advertising', advertising.toString())

        file?.forEach(f => formData.append('images', f))

        try {
          if(mode === 'create') {
           await createLot(formData)
           handleClear()
          } else if((mode === 'edit' || mode === 'editAdmin') && initialData?.lotNumber){
            await updateLot(formData, initialData?.lotNumber)
          }
          setConfirmCreateOrder(true)
          setLoading(false)
        } catch (error:any) {
          setLoading(false)
          setMessage(t('createLot', error.message))
          setTimeout(() => {
            setMessage('')
          }, 5000)
        }
  }


  const handleBack = () => {
    router.back()
  }


  return (
  <div className="flex flex-col justify-center items-center w-full gap-5 md:gap-10 md:min-h-120 xl:min-h-200 bg-white md:bg-gray-100 text-black">
    {loading ? (
      <div className={loadingBlock}>
        <Loading />
      </div>
    ): (
      <>
      {((initialData?.historyBid?.length ?? 0) > 0 && mode !== 'editAdmin') ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <X size={70} className="text-red-500"/>
          <h1 className="text-red-500 text-xl">{t('createLot', 'createLot-haveHistoryBid')}</h1>
        </div>
      ) : (
      confirmCreateOrder ? (
       <Success title={mode === 'create' ? t('createLot', 'lotSuccess') : t('createLot', 'lotSuccessUpdate')}/>
      ): (
        <>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-[90%] mt-5 md:mt-10 gap-5 md:gap-0">
          <h1 className="text-orange-600 text-3xl font-bold gap-2">{mode === 'create' ? t('createLot','createLot-title') : t('createLot','createLot-title-edit')} <span className="text-black">лоту</span></h1>
          <span onClick={handleBack} className={`${hover} flex justify-center items-center`}><ChevronDown className="rotate-90"/> Назад</span>
        </div>
          <div className="flex flex-col justify-center items-start w-full md:w-2/3 rounded-xl md:gap-4">
            
            <MainInfoSections 
            openCategory={openCategory} 
            setOpenCategory={setOpenCategory} 
            name={name} 
            setName={setName} 
            createLotCategory={transleteCategory || ''}  
            createLotSubCategory={transleteSubCategory || ''}  
            createLotSubSubCategory={transleteSubSubCategory || ''} />

            <PriceSections 
            price={price} 
            setPrice={setPrice} 
            priceStep={priceStep} 
            setPriceStep={setPriceStep} 
            blitzPrice={blitzPrice} 
            setBlitzPrice={setBlitzPrice}
            />

            <PhotoSections 
            setFile={setFile} 
            file={file} 
            preview={preview} 
            initialPreview={initialData?.images || []}
            setPreview={setPreview}/>

            <AutoReExtension 
            check={autoReExtension} 
            setCheck={setAutoReExtensio} 
            mode="autoReExtension"/>
            
            <DescriptionSections 
            description={description} 
            setDescription={setDescription}/>

            <StateSections 
            stateLot={stateLot} 
            setStateLot={setStateLot} 
            mode="state"/>

            <DateSections 
            date={Number(date)} 
            setDate={setDate} 
            time={time} 
            setTime={setTime}/>

            <LocationSections 
            location={location} 
            setLocation={setLocation}/>

            <StateSections 
            stateLot={delivery} 
            setStateLot={setDelivery} 
            mode="delivery"/>

            <AutoReExtension 
            check={advertising} 
            setCheck={setAdvertising} 
            mode="advertising"/>
          
            <Summary 
            autoReExtension={autoReExtension} 
            advertising={advertising} 
            handleCreateOrUpdate={handleCreateOrUpdate} 
            message={message} 
            mode={mode}
            />
          </div>
        </>
      )
      )}
       </>
    )}
    {openCategory && (
      <CategoryList 
      setOpenCategory={setOpenCategory} 
      openFrom="createLot" 
      createLotSetCategory={setCategory} 
      createLotSetSubCategory={setSubCategory} 
      createLotSetSubSubCategory={setSubSubCategory}/>
    )}
  </div>
  )
}

