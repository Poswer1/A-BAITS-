import { BadRequestException, Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user.model';
import { UpdateProfileDTO } from './dto/create-user.dto';


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

  async updateProfile(dto: UpdateProfileDTO, userId:string) {

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {...dto},
      returnDocument: 'after',
    )

    if(!updateUser) {
      throw new BadRequestException('ErrorUpdateUser')
    }
    
    return

  }

}
