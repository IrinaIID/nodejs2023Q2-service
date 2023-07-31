import { Injectable } from '@nestjs/common';
import { dbAlbums, dbTracks } from 'src/database/database';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  getAllAlbums() {
    return dbAlbums;
  }

  getAlbum(id: string) {
    return dbAlbums.find((album) => album.id === id);
  }

  createAlbm(albumDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      name: albumDto.name,
      year: albumDto.year,
      artistId: albumDto.artistId || null,
    };
    dbAlbums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(albumDto: UpdateAlbumDto, id: string) {
    const index = dbAlbums.findIndex((album) => album.id === id);
    if (index < 0) {
      return '404';
    } else {
      dbAlbums[index].name = albumDto.name;
      dbAlbums[index].artistId = albumDto.artistId || null;
      dbAlbums[index].year = albumDto.year;
      return dbAlbums[index];
    }
  }

  deleteAlbum(id: string) {
    const index = dbAlbums.findIndex((album) => album.id === id);
    if (index < 0) {
      return '404';
    } else {
      dbAlbums.splice(index, 1);
      const trackIndex = dbTracks.findIndex((track) => track.albumId === id);
      if (trackIndex > 0) {
        dbTracks[trackIndex].albumId = null;
      }
      return '204';
    }
  }
}
