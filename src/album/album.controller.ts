import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Album } from 'src/interfaces/interfaces';
import { AlbumService } from './album.service';
import { Response } from 'express';
import { validate as uuidValidate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllAlbums(): Album[] | [] {
    const albums = this.albumService.getAllAlbums();
    return albums;
  }

  @Get(':id')
  getAlbum(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Album {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST);
    } else {
      const album = this.albumService.getAlbum(id);
      if (!album) {
        res.status(HttpStatus.NOT_FOUND);
      } else {
        res.status(HttpStatus.OK);
        return album;
      }
    }
  }

  @Post()
  createAlbum(
    @Body() createAlbumDto: CreateAlbumDto,
    @Res({ passthrough: true }) res: Response,
  ): Album {
    const newAlbum = this.albumService.createAlbm(createAlbumDto);
    res.status(HttpStatus.CREATED);
    return newAlbum;
  }

  @Put(':id')
  updateAlbum(
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Album {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST);
    } else {
      const status = this.albumService.updateAlbum(updateAlbumDto, id);
      if (status === '404') {
        res.status(HttpStatus.NOT_FOUND);
      } else {
        res.status(HttpStatus.OK);
        return status;
      }
    }
  }

  @Delete(':id')
  deleteAlbum(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST);
    } else {
      const status = this.albumService.deleteAlbum(id);
      status === '404'
        ? res.status(HttpStatus.NOT_FOUND)
        : res.status(HttpStatus.NO_CONTENT);
    }
  }
}
