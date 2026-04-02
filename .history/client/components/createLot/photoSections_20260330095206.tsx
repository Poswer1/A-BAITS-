import { useTranslation } from "@/app/context/TranslationProvider"
import { block, Blockinput, nameInput } from "@/styles/createLot"
import { animationOpacity, hover } from "@/styles/style"
import { Camera, Image, Trash2} from "lucide-react"
import { useState } from "react"

interface ImagesState {
  file?: File
  preview?: string 
  toDelete?: boolean
}

interface PhotoSectionsProps {
  image: ImagesState[]
  setImage: React.Dispatch<React.SetStateAction<ImagesState[]>>
  setFile: React.Dispatch<React.SetStateAction<File[]>>
  file:File[],
  preview:string[],
  setPreview:React.Dispatch<React.SetStateAction<string[]>>
  initialPreview:string[]
}

export default function PhotoSections({image, setImage, setFile, file, preview, setPreview, initialPreview}:PhotoSectionsProps) {
    const BASE_URL = process.env.NEXT_PUBLIC_URL
    const {t} = useTranslation()

    const [message, setMessage] = useState('')
    const [hoverFile, setHoverFile] = useState<any>()
    const [dragIndex, setDragIndex] = useState<number | null>(null)

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(!e.target.files) return
      const newFiles = Array.from(e.target.files)
      
      const exestingWebp = newFiles.find(image.file => file.type === 'image/webp')
      const existingVideo = newFiles.find(file => file.type.startsWith('video/'))

      if(exestingWebp || existingVideo) {
        const message = exestingWebp ? t('createLot', 'formatFile') : existingVideo ? t('createLot', 'onlyPhoto') : ''
        setMessage(message?.toString())
        setTimeout(() => {
          setMessage('')
        }, 3000)
        return
      }

      setFile(prev => [...prev, ...newFiles])

      if (file.length + newFiles.length > 8) {
        setMessage(t('createLot','NOTmore8Photo'));
        return;
      }
      
      const newPreview = newFiles.map((file) => URL.createObjectURL(file))
      setPreview(prev => [...prev, ...newPreview])
    }

    const handleDeleteFile = (indexFile:number) => {
      setPreview(prev => prev.filter((file, index) => index !== indexFile))
      setFile(prev => prev.filter((file, index) => index !== indexFile))
    }

    const handleDrop = (dropIndex: number) => {
      if(dragIndex === null) return

      const updated = [...preview] // новый массив
      const updatedFile = [...file] // новый массив

      handleDropAction(dropIndex, dragIndex, updated, setPreview)
      handleDropAction(dropIndex, dragIndex, updatedFile, setFile)
    }

    const handleDropAction = (dropIndex:number, dragIndex: number, updated:any[], setArray: React.Dispatch<React.SetStateAction<any[]>>) => {
      if(dragIndex === null) return

      const draggedItem = updated[dragIndex] // ищем элемент в массиве по индекску 

      updated.splice(dragIndex, 1) // splice (индекс, кол сколько удаляем)
      updated.splice(dropIndex, 0, draggedItem) // splice (индекс, кол сколько удаляем, на что меняем)
      setArray(updated)
      setDragIndex(null)
    }

  return (
    <div className={block}>
       <div className={Blockinput}>
          <span className={nameInput}>Фото</span>
          <p className={`${file.length > 0 ? 'flex' : 'hidden md:flex'} text-gray-500 text-sm`}>{t('createLot','createLot-firstPhoto')}</p>
          <label htmlFor="fileInput" className={`${file.length > 0 && 'hidden'} md:hidden border-dashed border-2 border-orange-600 flex flex-col gap-2 justify-center items-center h-50 bg-orange-600/10 w-full rounded-lg`}>
            <Image className="text-orange-600/50" size={100}/>
            <span className="rounded-xl">Добавить фото</span>
          </label>
          <div className={`${file.length > 0 ? 'flex' : 'hidden md:flex'} flex flex-wrap justify-start items-center w-full gap-3`}>
           <input type="file" multiple id="fileInput" onChange={handleFile} className="hidden"/>
            {Array.from({ length: 8 }).map((_, index) => (
              <label htmlFor="fileInput" key={index} className="flex justify-center items-center bg-gray-100 h-32 w-[47%] md:w-1/5 cursor-pointer relative overflow-hidden">
                {preview[index] ? (
                  <>
                    <div onDrop={() => handleDrop(index)} draggable  onDragStart={() => setDragIndex(index)}  onDragOver={(e) => e.preventDefault()} className="w-full h-full">
                      <img src={initialPreview.length ? `${BASE_URL}${preview[index]}` : preview[index]} className="object-cover w-full h-full object-center rounded" onMouseEnter={() => setHoverFile(index)}/>
                    </div>
                    {hoverFile === index && (
                    <div className={` ${animationOpacity} absolute`} onClick={(e) => {e.preventDefault(), handleDeleteFile(index)}} onMouseLeave={() => setHoverFile('')}>
                      <Trash2 className={`${hover} bg-white rounded-full p-2 overflow-hidden`} size={40}/>
                    </div>
                    )}
                  </>
                ): (
                  <Camera className="text-gray-500"/>
                )}
                {index === 0 && (
                  <span className="absolute bottom-0 left-0 bg-orange-600 px-2  text-white text-sm">{t('createLot','createLot-photo-main')}</span>
                )}
              </label>
            ))}
          </div>
            {message && (
              <span className="text-red-600">{message}</span>
            )}
        </div>
      </div> 
  )
}
