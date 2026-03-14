import { Controller, Param, Patch } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Patch('addFavorite/:id')
  async addFavorite(@Param('id') id:string) {

  }

}
