import { diskStorage } from 'multer'
import path from 'path' // работа с путями файлов
import fs from 'fs' // работа с фалйами 
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

export const ProccessImages = async (files: Express.Multer.File[]) => {
    if(!files) return

    await Promise.all( // Promise.all ждет пока все промисы завершаться такие как sharp .toFile fs.unlinkSync они возрощают промисы
        files.map(async (file) => {
            const parsedName = path.parse(file.filename).name // имя файла без разширения
            const webpName = `${parsedName}.webp` 
            const webpPath = path.join(file.destination, webpName) // file.destination путь к папку куда был загружен файл
          
                await sharp(file.path)
                .resize(600, 600, {fit:'cover'})
                .webp({quality: 80})
                .toFile(webpPath)

            await fs.promises.unlink(file.path) // unlinkSync синхронно удаляет файл с диска.

            file.filename = webpName // обновляем имя файла
        })
    )

    return files.map(file => `/uploads/lots/${file.filename}`)

}



