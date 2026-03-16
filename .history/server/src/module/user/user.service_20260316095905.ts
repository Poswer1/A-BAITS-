import { BadRequestException, Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user.model';
import { UpdateProfileDTO } from './dto/create-user.dto';
import { ProccessImages } from 'src/utils/files-upload';


@Injectable()
export class UserService {

  async getUserById(id:string) {
    try {
      const user = await UserModel.findById(id).select('-password');
      return user
    } catch (error) {
      throw new BadRequestException('Помилка получення профилю') 
    }
  }

  async getUserByName(name: string) {
    try {
      const user = await UserModel.findOne({name:name}).select('-password -email');
      return user
    } catch (error) {
      throw new BadRequestException('Помилка получення профилю')
    }
  }

  async updateProfile(dto: UpdateProfileDTO, userId:string, file: Express.Multer.File) {
  
    const user = await UserModel.findById(userId)
    if(!user) {
      console.log('пользователь не найден при обновление профиля')
    }

    const image = file && await ProccessImages([file], '/uploads/avatar/')

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        ...dto,
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
