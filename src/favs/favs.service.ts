import { Injectable } from '@nestjs/common';
import { dbAlbums, dbArtists, dbFavs, dbTracks } from 'src/database/database';

@Injectable()
export class FavsService {

  getAllFavs() {
    return dbFavs
  }

  addTrackFavs(id: string) {
    const track = dbTracks.find(track => track.id === id);
    if(!track) {
      return '422'
    } else {
      dbFavs.tracks.push(track);
      return track
    }
  }

  deleteTrackFavs(id: string) {
    const index = dbFavs.tracks.findIndex(track => track.id === id);
    if (index < 0) {
      return '404'
    } else {
      dbFavs.tracks.splice(index, 1);
      return '204'
    }
  }

  addAlbumFavs(id: string) {
    const album = dbAlbums.find(album => album.id === id);
    if(!album) {
      return '422'
    } else {
      dbFavs.albums.push(album);
      return album
    }
  }

  deleteAlbumFavs(id: string) {
    const index = dbFavs.albums.findIndex(album => album.id === id);
    if (index < 0) {
      return '404'
    } else {
      dbFavs.albums.splice(index, 1);
      return '204'
    }
  }

  addArtistFavs(id: string) {
    const artist = dbArtists.find(artist => artist.id === id);
    if(!artist) {
      return '422'
    } else {
      dbFavs.artists.push(artist);
      return artist
    }
  }

  deleteArtistFavs(id: string) {
    const index = dbFavs.artists.findIndex(artist => artist.id === id);
    if (index < 0) {
      return '404'
    } else {
      dbFavs.artists.splice(index, 1);
      return '204'
    }
  }

}
