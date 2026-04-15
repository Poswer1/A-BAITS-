import { BadRequestException, Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user.model';
import { UpdateProfileDTO } from './dto/create-user.dto';
import { ProccessImages } from 'src/utils/files-upload';
import fs from 'fs/promises'
import path from 'path';
import bcrypt from 'bcrypt'
import { EmailService } from '../email/email.service';
import { TempoparyCode } from 'src/models/TemporaryCode';

@Injectable()
export class UserService {

  constructor (private readonly emailService:EmailService) {}

  async getUserById(id:string) {
    try {
      const user = await UserModel.findById(id).select('-password');
      return user
    } catch (error) {
      throw new BadRequestException('Помилка получення профилю') 
    }
  }

  async getUserStatus(userId:string) {
    const statusUser = await UserModel.findById(userId).populate('status UnblockDate')
    if(!statusUser) throw new BadRequestException('userNotFound')
    return {status: statusUser?.status, UnblockDate: statusUser?.UnblockDate}
  }

  async getUserByName(name: string) {
    try {
      const user = await UserModel.findOne({name:name}).select('-password -email');
      return user
    } catch (error) {
      throw new BadRequestException('Помилка получення профилю')
    }
  }


  async updatePassword(email:string, newPassword:string) {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(newPassword, salt)
    const update = await UserModel.updateOne(
      {email: email},
      {password: hash}
    )
    if(update.modifiedCount === 0) throw new BadRequestException('ErrorChagePassword')

    return {success:true} 
  }

  async updateProfile(dto: UpdateProfileDTO, userId:string,role:string, file?: Express.Multer.File) {
    
    const user = await UserModel.findById(userId)
    if(!user) throw new BadRequestException('пользователь не найден при обновление профиля')

    if((dto.email !== user.email || dto.password)&& role === 'user') {
      if(!dto.code) throw new BadRequestException('EnterCode')
      await this.emailService.comparisonCode(dto.code)
    }  

    if(user?.avatar && !user?.avatar.includes('defaultAvatar')) {
      try {
        const filePath = path.join(process.cwd(), user?.avatar.slice(1)) 
        // path.join соеденяет пути в один 
        // process.cwd() корневой путь
        // .slice(1) делаем что бы взять путь к файлу без первого /
        await fs.access(filePath) //access проверяет существует ли файл
        await fs.unlink(filePath)
      } catch (error) {
        console.log('Старого аватара нету')
      }
    }

    const image = file && await ProccessImages([file], '/uploads/avatar/')
    let hash = ''
    if(dto.password) {
      hash = await bcrypt.hash(dto.password, 10)
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        ...dto,
        ...(hash && {password: hash}),
        ...(image && {avatar: image[0]}),
        ...(!image && dto.defaultAvatar && { avatar: dto.defaultAvatar })
      },
      {returnDocument: 'after'}
    )

    if(!updateUser) {
      throw new BadRequestException('ErrorUpdateUser')
    }
    
    return updateUser

  }

}
