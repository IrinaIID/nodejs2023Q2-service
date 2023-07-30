import { Injectable } from '@nestjs/common';
import { dbTracks } from 'src/database/database';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';


@Injectable()
export class TrackService {


  getAllTacks() {
    return dbTracks
  }

  getTrack(id: string) {
    return dbTracks.find(track => track.id === id);
  }

  createTrack(trackDto: CreateTrackDto) {
    const newTarck = {
      id: uuidv4(),
      name: trackDto.name,
      artistId: trackDto.artistId || null,
      albumId: trackDto.albumId || null,
      duration: trackDto.duration
    }
    dbTracks.push(newTarck)
    return newTarck
  }

  updateTrack(trackDto: UpdateTrackDto, id: string) {
    const index = dbTracks.findIndex(track => track.id === id);
    if (index < 0) {
      return '404'
    } else {
      dbTracks[index].name = trackDto.name;
      dbTracks[index].artistId = trackDto.artistId || null;
      dbTracks[index].albumId = trackDto.albumId || null;
      dbTracks[index].duration = trackDto.duration;
      return dbTracks[index]
    }
  }

  deleteTrack(id: string) {
    const index = dbTracks.findIndex(user => user.id === id);
    if (index < 0) {
      return '404'
    } else {
      const index = dbTracks.findIndex(user => user.id === id);
      dbTracks.splice(index, 1);
      return '204'
    }
  }

}

