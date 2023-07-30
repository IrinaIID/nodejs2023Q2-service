import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { FavoritesResponse, Track } from 'src/interfaces/interfaces';
import { FavsService } from './favs.service';
import { validate as uuidValidate } from 'uuid';
import { Response } from 'express';

@Controller('favs')
export class FavsController {

  constructor(private readonly favsService: FavsService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllFavs(): FavoritesResponse {
    const favs = this.favsService.getAllFavs()
    return favs
  }

  @Post('track/:id')
  addTrackFavs(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST)
    } else {
      const status = this.favsService.addTrackFavs(id);
      if (status === '422') {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY)
      } else {
        res.status(HttpStatus.CREATED);
        return status
      }
    }
  }

  @Delete('track/:id')
  deleteTrackFavs(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST)
    } else {
      const status = this.favsService.deleteTrackFavs(id);
      status === '404' ? res.status(HttpStatus.NOT_FOUND) : res.status(HttpStatus.NO_CONTENT);
    }
  }

  @Post('album/:id')
  addAlbumFavs(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST)
    } else {
      const status = this.favsService.addAlbumFavs(id);
      if (status === '422') {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY)
      } else {
        res.status(HttpStatus.CREATED);
        return status
      }
    }
  }

  @Delete('album/:id')
  deleteAlbumFavs(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST)
    } else {
      const status = this.favsService.deleteAlbumFavs(id);
      status === '404' ? res.status(HttpStatus.NOT_FOUND) : res.status(HttpStatus.NO_CONTENT);
    }
  }

  @Post('artist/:id')
  addArtistFavs(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST)
    } else {
      const status = this.favsService.addArtistFavs(id);
      if (status === '422') {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY)
      } else {
        res.status(HttpStatus.CREATED);
        return status
      }
    }
  }

  @Delete('artist/:id')
  deleteArtistFavs(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST)
    } else {
      const status = this.favsService.deleteArtistFavs(id);
      status === '404' ? res.status(HttpStatus.NOT_FOUND) : res.status(HttpStatus.NO_CONTENT);
    }
  }

}
