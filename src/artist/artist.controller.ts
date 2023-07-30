import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Artist } from 'src/interfaces/interfaces';
import { ArtistService } from './artist.service';
import { validate as uuidValidate } from 'uuid';
import { Response } from 'express';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';


@Controller('artist')
export class ArtistController {

  constructor(private readonly artistService: ArtistService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllArtists(): Artist[] | [] {
    const artists = this.artistService.getAllArtists()
    return artists
  }

  @Get(':id')
  getArtist(@Param('id') id: string, @Res({ passthrough: true }) res: Response): Artist {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST)
    } else {
      const artist = this.artistService.getArtist(id);
      if(!artist) {
        res.status(HttpStatus.NOT_FOUND)
      } else {
        res.status(HttpStatus.OK);
        return artist
      }
    }
  }

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto, @Res({ passthrough: true }) res: Response): any {
    if (!createArtistDto.grammy || !createArtistDto.name) {
      res.status(HttpStatus.BAD_REQUEST);
      return
    } else {
      const newUser = this.artistService.createArtist(createArtistDto)
      res.status(HttpStatus.CREATED);
      return newUser
    }
  }

  @Put(':id')
  updateUser(@Body() updateArtistDto: UpdateArtistDto, @Param('id') id: string, @Res({ passthrough: true }) res: Response): any {
    if (!updateArtistDto.grammy || !updateArtistDto.name) {
      res.status(HttpStatus.BAD_REQUEST);
    } else if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST)
    } else {
      const status = this.artistService.updateArtist(updateArtistDto, id);
      if (status === '404') {
        res.status(HttpStatus.NOT_FOUND)
      } else {
        res.status(HttpStatus.OK);
        return status
      }
    }
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST)
    } else {
      const status = this.artistService.deleteArtist(id);
      status === '404' ? res.status(HttpStatus.NOT_FOUND) : res.status(HttpStatus.NO_CONTENT);
    }
  }

}
