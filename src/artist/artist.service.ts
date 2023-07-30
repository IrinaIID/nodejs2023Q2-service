import { Injectable } from '@nestjs/common';
import { dbAlbums, dbArtists, dbFavs, dbTracks } from 'src/database/database';
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
      dbArtists.splice(index, 1);
      const trackIndex = dbTracks.findIndex(track => track.artistId === id);
      if (trackIndex > 0) {
        dbTracks[trackIndex].artistId = null
      }
      const albumIndex = dbAlbums.findIndex(album => album.artistId === id);
      if (albumIndex > 0) {
        dbAlbums[albumIndex].artistId = null
      }
      return '204'
    }
  }

}
