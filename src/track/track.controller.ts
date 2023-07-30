import { Controller, Get, HttpCode, HttpStatus, Param, Res } from '@nestjs/common';
import { TrackService } from './track.service';
import { Response } from 'express';
import { validate as uuidValidate } from 'uuid';


@Controller('track')
export class TrackController {

  constructor(private readonly trackService: TrackService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  // @Redirect('http://google.com', 301)
  getAllTarcks() {
    const tracks = this.trackService.getAllTacks();
    return JSON.stringify(tracks)
  }

  @Get(':id')
  getUser(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST)
    } else {
      const track = this.trackService.getTrack(id)
      if(!track) {
        res.status(HttpStatus.NOT_FOUND)
      } else {
        res.status(HttpStatus.OK);
        return JSON.stringify(track)
      }
    }
  }

}
