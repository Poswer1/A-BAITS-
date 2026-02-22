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
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { hover } from "@/styles/style"
import { createLot } from "@/services/lot"
import Loading from "@/components/utils/loadig"
import Success from "@/components/createLot/success"

function page() {

    const {t} = useTranslation()


    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [stateLot, setStateLot] = useState('')
    const [price, setPrice] = useState(1)
    const [priceStep, setPriceStep] = useState(1)
    const [blitzPrice, setBlitzPrice] = useState(1)
    const [reservPrice, setReservPrice] = useState(1)
    const [date, setDate] = useState(0)
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [delivery, setDelivery] = useState('')
    const [autoReExtension, setAutoReExtensio] = useState(false)
    const [advertising, setAdvertising] = useState(false)
    const [file, setFile] = useState<File[]>([])
    const [preview, setPreview] = useState<string[]>([])
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [subSubCategory, setSubSubCategory] = useState('')
    const [message, setMessage] = useState('')

    const [openCategory, setOpenCategory] = useState(false)
    const [confirmCreateOrder, setConfirmCreateOrder] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClear = () => {
      setName('')
      setDescription('')
      setPrice(0)
      setPriceStep(0)
      setBlitzPrice(0)
      setReservPrice(0)
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

      const token = localStorage.getItem('token')
      if(!token) {
        setMessage(t("global", 'accountNotFound'))
        return
      }

       if (!name || !description || !stateLot || !location || !delivery || !price || !priceStep || !date || !time || !file || file.length === 0) {
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
        if (reservPrice)formData.append('reservPrice', reservPrice.toString())
        formData.append('autoReExtension', autoReExtension.toString())  
        formData.append('descriptions', description)
        formData.append('state', stateLot)
        formData.append('date', date.toString())
        formData.append('dateTime', time)
        formData.append('location', location)
        formData.append('delivary', delivery)
        formData.append('Advertising', advertising.toString())

        file?.forEach(f => formData.append('images', f))

        try {
          await createLot(formData, token)
          handleClear()
          setConfirmCreateOrder(true)
          setLoading(false)
        } catch (error:any) {
          setLoading(false)
          setMessage(error.message)
          setTimeout(() => {
            setMessage('')
          }, 3000)
        }

  }


  return (
  <div className="flex flex-col justify-center items-center w-full gap-10 min-h-[70vh] bg-gray-100">
    {loading ? (
      <Loading />
    ): (
      <>
      {confirmCreateOrder && (
        <Success />
      )}
        <div className="flex justify-between items-center w-[90%] mt-10">
          <h1 className="text-orange-600 text-3xl font-bold gap-2">{t('createLot','createLot-title')} <span className="text-black">лоту</span></h1>
          <span className={`${hover} flex justify-center items-center`}><ChevronDown className="rotate-90"/> Назад</span>
        </div>
          <div className="flex flex-col justify-center items-start w-2/3  rounded-xl gap-4">
            
            <MainInfoSections openCategory={openCategory} setOpenCategory={setOpenCategory} name={name} setName={setName} category={category}  subCategory={subCategory}  subSubCategory={subSubCategory} />

            <PriceSections price={price} setPrice={setPrice} priceStep={priceStep} setPriceStep={setPriceStep} blitzPrice={blitzPrice} setBlitzPrice={setBlitzPrice} reservPrice={reservPrice} setReservPrice={setReservPrice}/>

            <PhotoSections setFile={setFile} file={file} preview={preview} setPreview={setPreview}/>

            <AutoReExtension check={autoReExtension} setCheck={setAutoReExtensio} mode="autoReExtension"/>
            
            <DescriptionSections description={description} setDescription={setDescription}/>

            <StateSections stateLot={stateLot} setStateLot={setStateLot} mode="state"/>

            <DateSections date={date} setDate={setDate} time={time} setTime={setTime}/>

            <LocationSections location={location} setLocation={setLocation}/>

            <StateSections stateLot={delivery} setStateLot={setDelivery} mode="delivery"/>

            <AutoReExtension check={advertising} setCheck={setAdvertising} mode="advertising"/>
          
            <Summary reservPrice={reservPrice} autoReExtension={autoReExtension} advertising={advertising} handleCreateOrUpdate={handleCreateOrUpdate} message={message}/>
          
          </div>
       </>
    )}
    {openCategory && (
      <CategoryList setOpenCategory={setOpenCategory} openFrom="createLot" category={category} setCategory={setCategory} subCategory={subCategory} setSubCategory={setSubCategory} subSubCategory={subSubCategory} setSubSubCategory={setSubSubCategory}/>
    )}
  </div>
  )
}

export default page
