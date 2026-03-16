import { diskStorage } from 'multer'
import fs from 'fs/promises'
import path from 'path' // работа с путями файлов
import sharp from 'sharp'

export const ImagesInterceptor = (destination:string) => {
    return {
        storage: diskStorage({
            destination: destination, // destination место назначения
            filename: (req, file, cb) => { // cb пропускаем дальше или нет
                const ext = path.extname(file.originalname) // path.extname дает разширение файла из именни
                cb(null, Date.now() + ext) // первым идет что будет если ошибка. Второрым текущие время для создание именени файла.Третим разширение итог: 137347372.png
            }
        })
    }
}

// multer сохроняет файл и кладет его в req.file

export const ProccessImages = async (files: Express.Multer.File[], destination:string) => {
    if(!files) return

    return Promise.all(
        files.map(async (file) => {
            const parsedName = path.parse(file.filename).name
            const newName = `${parsedName}-${Math.round(Math.random() * 1e6)}.webp`
            const finalPath = path.join(destination, newName)

            // конвертируем в буфер, без временных файлов
            const buffer = await sharp(file.path)
                .resize(600, 600, { fit: 'cover' })
                .webp({ quality: 80 })
                .toBuffer()

            // сохраняем буфер напрямую в папку назначения
            await fs.writeFile(finalPath, buffer)

            // удаляем оригинальный файл multer
            await fs.unlink(file.path)

            file.filename = newName
            return `${destination}${newName}`
        })
    )

    return files.map(file => `${destination}${file.filename}`)

}



