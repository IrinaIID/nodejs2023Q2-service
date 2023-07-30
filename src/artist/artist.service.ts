import { Injectable } from '@nestjs/common';
import { dbArtists } from 'src/database/database';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';


@Injectable()
export class ArtistService {

  getAllArtists() {
    return dbArtists
  }

  getArtist(id: string) {
    return dbArtists.find(artist => artist.id === id)
  }

  createArtist(artistDto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      name: artistDto.name,
      grammy: artistDto.grammy
    }
    dbArtists.push(newArtist);
    return newArtist
  }

  updateArtist(artistDto: UpdateArtistDto, id: string) {
    const index = dbArtists.findIndex(artist => artist.id === id)
    if (index < 0) {
      return '404'
    } else {
      dbArtists[index].grammy = artistDto.grammy;
      dbArtists[index].name = artistDto.name;
      return dbArtists[index]
    }
  }

  deleteArtist(id: string) {
    const index = dbArtists.findIndex(artist => artist.id === id);
    if (index < 0) {
      return '404'
    } else {
      dbArtists.splice(index, 1)
      return '204'
    }
  }

}
