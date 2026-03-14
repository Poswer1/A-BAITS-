import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth-guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('addFavorite/:id')
  async addFavorite(@Param('id') id:string, @CurrentUser('id') userId:string) {
    return this.favoritesService.addFavorite(id, userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get()

}
