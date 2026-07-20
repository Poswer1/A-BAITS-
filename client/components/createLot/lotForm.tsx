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
import Toast from "../ui/toast"

interface LotFormProps {
mode: 'create' | 'edit' | 'editAdmin',
initialData?: LotTypes
}

export default function LotForm({mode, initialData}:LotFormProps) {

    const {t} = useTranslation()
    const router = useRouter()
    const params = useParams()
    const lang = params.lang as string

    const [name, setName] = useState(initialData?.name || '')
    const [description, setDescription] = useState(initialData?.descriptions || '')
    const [stateLot, setStateLot] = useState(initialData?.state || '')
    const [price, setPrice] = useState(initialData?.startPrice || 1)
    const [priceStep, setPriceStep] = useState(initialData?.stepPrice || 1)
    const [blitzPrice, setBlitzPrice] = useState(initialData?.blitzPrice || 0)
    const [date, setDate] = useState(initialData?.date || 0)
    const [time, setTime] = useState(initialData?.dateTime || '21:00')
    const [location, setLocation] = useState(initialData?.location || '')
    const [delivery, setDelivery] = useState<string[]>(Array.isArray(initialData?.delivary) ? initialData.delivary : [])
    const [autoReExtension, setAutoReExtensio] = useState(initialData?.autoReExtension || false)
    const [advertising, setAdvertising] = useState(initialData?.Advertising || false)
    const [file, setFile] = useState<File[]>([])
    const [preview, setPreview] = useState<string[]>(initialData?.images || [])
    const [category, setCategory] = useState(initialData?.category || '')
    const [subCategory, setSubCategory] = useState(initialData?.subCategory || '')
    const [subSubCategory, setSubSubCategory] = useState(initialData?.subSubCategory || '')
    const [message, setMessage] = useState('')
    const [showErrors, setShowErrors] = useState(false)

    const [openCategory, setOpenCategory] = useState(false)
    const [confirmCreateOrder, setConfirmCreateOrder] = useState(false)
    const [loading, setLoading] = useState(true)

    // Состояния для ошибок валидации
    const [errors, setErrors] = useState({
      name: '',
      description: '',
      stateLot: '',
      location: '',
      delivery: '',
      price: '',
      priceStep: '',
      date: '',
      time: '',
      category: '',
      subCategory: '',
      photo: ''
    })

    const activeCategory = categoriesWithIcons.find(obg => obg.name === category)
    const categoryHasSubcategories = (activeCategory?.subcategories?.length || 0) > 0
    
    const transleteCategory = getValueByLang(categoriesWithIcons, category, lang)
    const transleteSubCategory = getValueByLang(activeCategory?.subcategories || [], subCategory, lang)
    const transleteSubSubCategory = getValueByLang(activeCategory?.subcategories?.find(sc => sc.name === subCategory)?.subcategories || [], subSubCategory, lang)

    const hasImages = (preview?.length ?? 0) > 0 || (file?.length ?? 0) > 0
    const missing = {
      name: !name,
      description: !description,
      stateLot: !stateLot,
      location: !location,
      delivery: (delivery?.length ?? 0) === 0,
      price: !price,
      priceStep: !priceStep,
      date: !date,
      time: !time,
      category: !category,
      subCategory: categoryHasSubcategories && !subCategory,
      photo: !hasImages
    }
    const hasMissing = Object.values(missing).some(Boolean)

    useEffect(() => {
      const checkAuth = async () => {
        const isAuth = await getStatusAuth()

        if (!isAuth) {
          router.push(`/${lang}/auth/login`)
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
      setDelivery([])
      setAutoReExtensio(false)
      setAdvertising(false)
      setFile([])
      setCategory('')
      setSubCategory('')
      setSubSubCategory('')
      setPreview([])
      setErrors({
        name: '',
        description: '',
        stateLot: '',
        location: '',
        delivery: '',
        price: '',
        priceStep: '',
        date: '',
        time: '',
        category: '',
        subCategory: '',
        photo: ''
      })
    }

  
    const handleNameChange = (value: string) => {
      setName(value)
      if (errors.name) setErrors(prev => ({...prev, name: ''}))
    }

    const handleDescriptionChange = (value: string) => {
      setDescription(value)
      if (errors.description) setErrors(prev => ({...prev, description: ''}))
    }

    const handlePriceChange = (value: number) => {
      setPrice(value)
      if (errors.price) setErrors(prev => ({...prev, price: ''}))
    }

    const handlePriceStepChange = (value: number) => {
      setPriceStep(value)
      if (errors.priceStep) setErrors(prev => ({...prev, priceStep: ''}))
    }

    const handleLocationChange = (value: string) => {
      setLocation(value)
      if (errors.location) setErrors(prev => ({...prev, location: ''}))
    }

    const handleStateChange = (value: string) => {
      setStateLot(value)
      if (errors.stateLot) setErrors(prev => ({...prev, stateLot: ''}))
    }

    const handleDateChange = (value: number) => {
      setDate(value)
      if (errors.date) setErrors(prev => ({...prev, date: ''}))
    }

    const handleTimeChange = (value: string) => {
      setTime(value)
      if (errors.time) setErrors(prev => ({...prev, time: ''}))
    }

    const handleCategoryChange = (value: string) => {
      setCategory(value)
      setSubCategory('')
      setSubSubCategory('')
      if (errors.category || errors.subCategory) {
        setErrors(prev => ({...prev, category: '', subCategory: ''}))
      }
    }

    const handleSubCategoryChange = (value: string) => {
      setSubCategory(value)
      if (errors.subCategory) {
        setErrors(prev => ({...prev, subCategory: ''}))
      }
    }

    const handleSubSubCategoryChange = (value: string) => {
      setSubSubCategory(value)
      if (errors.subCategory) {
        setErrors(prev => ({...prev, subCategory: ''}))
      }
    }

    const handleDeliveryChange = (value: string[]) => {
      setDelivery(value)
      if (errors.delivery) setErrors(prev => ({...prev, delivery: ''}))
    }

   const handlePreviewChange: React.Dispatch<React.SetStateAction<string[]>> = (value) => {
    setPreview(value);
    if (errors.photo) {
      setErrors(prev => ({ ...prev, photo: '' }));
    }
  };

    const handleCreateOrUpdate = async () => {
       const validationErrors = {
         name: !name ? t('createLot','createLot-name') : '',
         description: !description ? t('createLot','createLot-descriptions') : '',
         stateLot: !stateLot ? t('createLot','createLot-state-title') : '',
         location: !location ? t('createLot','createLot-locationTitle') : '',
         delivery: delivery.length === 0 ? t('createLot','create-delivary-title') : '',
         price: !price ? t('createLot','createLot-StartingPrice') : '',
         priceStep: !priceStep ? t('createLot','createLot-step') : '',
         date: !date ? t('createLot','createLot-Date') : '',
         time: !time ? t('createLot','createLot-DateTime') : '',
         category: !category ? t('createLot','createLot-category') : '',
         subCategory: categoryHasSubcategories && !subCategory ? t('createLot','createLot-selectCategory') : '',
         photo: (!preview || preview.length === 0) ? t('createLot','createLot-photo') : ''
       }

       setErrors(validationErrors)

       if (Object.values(validationErrors).some(error => error)) {
          const missingFields = [
            validationErrors.name,
            validationErrors.description,
            validationErrors.stateLot,
            validationErrors.location,
            validationErrors.delivery,
            validationErrors.price,
            validationErrors.priceStep,
            validationErrors.date,
            validationErrors.time,
            validationErrors.category,
            validationErrors.subCategory,
            validationErrors.photo
          ].filter(Boolean)
          setMessage(`Заполните: ${missingFields.join(', ')}`)
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

      if(blitzPrice !== 0 && blitzPrice < price) {
        setMessage(t('createLot', 'blitzPriceLow'))
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
        if(subCategory)formData.append('subCategory', subCategory)
        if(subSubCategory)formData.append('subSubCategory', subSubCategory)
        formData.append('stepPrice', priceStep.toString())
        if (blitzPrice)formData.append('blitzPrice', blitzPrice.toString())
        if(autoReExtension)formData.append('autoReExtension', autoReExtension.toString())  
        formData.append('descriptions', description)
        formData.append('state', stateLot)
        formData.append('date', date.toString())
        formData.append('dateTime', time)
        formData.append('location', location)
        delivery?.forEach((i: string) => formData.append('delivary', i))
        
        if(advertising)formData.append('Advertising', advertising.toString())

        file?.forEach(f => formData.append('images', f))

        if(!file && mode === 'edit' || mode === 'editAdmin') {
          const latestPreview = [...preview]
          const filteredPreview = latestPreview.filter(p => 
            typeof p === 'string' && p.startsWith('/uploads/lots/')
          );
          formData.append('preview', JSON.stringify(filteredPreview)) 
        }

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
  <div className="flex flex-col justify-center items-center w-full gap-5 md:gap-10 min-h-screen bg-white md:bg-gray-100 text-black">
    {loading ? (
      <div className={loadingBlock}>
        <Loading />
      </div>
    ): (
      <>
      {((initialData?.historyBid?.length ?? 0) > 0 && mode !== 'editAdmin') ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <X size={70} className="text-red-500"/>
          <h1 className="text-red-500 text-xl md:text-2xl text-center">{t('createLot', 'createLot-haveHistoryBid')}</h1>
          <span onClick={handleBack} className={`${hover} text-gray-500 border-b`}>Назад</span>
        </div>
      ) : (
      confirmCreateOrder ? (
       <Success mode="lot" title={mode === 'create' ? t('createLot', 'lotSuccess') : t('createLot', 'lotSuccessUpdate')}/>
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
            setName={handleNameChange} 
            createLotCategory={transleteCategory || ''}  
            createLotSubCategory={transleteSubCategory || ''}  
            createLotSubSubCategory={transleteSubSubCategory || ''}
            nameError={errors.name}
            categoryError={errors.category || errors.subCategory} />

            <PriceSections 
            price={price} 
            setPrice={handlePriceChange} 
            priceStep={priceStep} 
            setPriceStep={handlePriceStepChange} 
            blitzPrice={blitzPrice} 
            setBlitzPrice={setBlitzPrice}
            priceError={errors.price}
            priceStepError={errors.priceStep}
            />

            <PhotoSections 
            setFile={setFile} 
            file={file} 
            preview={preview} 
            initialPreview={initialData?.images || []}
            setPreview={handlePreviewChange}
            photoError={errors.photo}/>

            <AutoReExtension 
            check={autoReExtension} 
            setCheck={setAutoReExtensio} 
            mode="autoReExtension"/>
            
            <DescriptionSections 
            description={description} 
            setDescription={handleDescriptionChange}
            descriptionError={errors.description}/>

            <StateSections 
            stateLot={stateLot} 
            setStateLot={handleStateChange} 
            mode="state"
            error={errors.stateLot}/>

            <DateSections 
            date={Number(date)} 
            setDate={handleDateChange} 
            time={time} 
            setTime={setTime}
            dateError={errors.date}
            timeError={errors.time}/>

            <LocationSections 
            location={location} 
            setLocation={handleLocationChange}
            locationError={errors.location}/>

            <StateSections 
            stateLot={delivery} 
            setStateLot={handleDeliveryChange} 
            mode="delivery"
            error={errors.delivery}/>

            <AutoReExtension 
            check={advertising} 
            setCheck={setAdvertising} 
            mode="advertising"/>
          
            <Summary 
            autoReExtension={autoReExtension} 
            advertising={advertising} 
            handleCreateOrUpdate={handleCreateOrUpdate} 
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
      createLotSetCategory={handleCategoryChange} 
      createLotSetSubCategory={handleSubCategoryChange} 
      createLotSetSubSubCategory={handleSubSubCategoryChange}/>
    )}
    <Toast error={message} message=""/>
  </div>
  )
}

