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
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { hover } from "@/styles/style"
import { createLot } from "@/services/lot"
import Loading from "@/components/ui/loadig"
import Success from "@/components/createLot/success"
import { getStatusAuth } from "@/services/auth"
import { useRouter } from "next/navigation"
import { loadingBlock } from "@/styles/global"

function page() {

    const {t} = useTranslation()
    const router = useRouter()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [stateLot, setStateLot] = useState('')
    const [price, setPrice] = useState(1)
    const [priceStep, setPriceStep] = useState(1)
    const [blitzPrice, setBlitzPrice] = useState(1)
    const [reservPrice, setReservPrice] = useState(1)
    const [date, setDate] = useState(0)
    const [time, setTime] = useState('21:00')
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
    const [confirmCreateOrder, setConfirmCreateOrder] = useState(true)
    const [loading, setLoading] = useState(true)


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
          await createLot(formData)
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

  const handleBack = () => {
    router.back()
  }


  return (
  <div className="flex flex-col justify-center items-center w-full gap-10 bg-white md:bg-gray-100 text-black">
    {loading ? (
      <div className={loadingBlock}>
        <Loading />
      </div>
    ): (
      <>
      {confirmCreateOrder ? (
        <Success />
      ): (

      )}
       </>
    )}
    {openCategory && (
      <CategoryList setOpenCategory={setOpenCategory} openFrom="createLot" category={category} setCategory={setCategory} subCategory={subCategory} setSubCategory={setSubCategory} subSubCategory={subSubCategory} setSubSubCategory={setSubSubCategory}/>
    )}
  </div>
  )
}

export default page
