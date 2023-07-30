import { Injectable } from '@nestjs/common';
import { dbTracks } from 'src/database/database';


@Injectable()
export class TrackService {


  getAllTacks() {
    return dbTracks
  }

  getTrack(id: string) {
    return dbTracks.find(track => track.id === id);
  }

}
