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
import { TrackService } from './track.service';
import { Response } from 'express';
import { validate as uuidValidate } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllTarcks() {
    const tracks = this.trackService.getAllTacks();
    return tracks;
  }

  @Get(':id')
  getTrack(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST);
    } else {
      const track = this.trackService.getTrack(id);
      if (track) {
        res.status(HttpStatus.OK);
        return track;
      } else {
        res.status(HttpStatus.NOT_FOUND);
      }
    }
  }

  @Post()
  createTrack(
    @Body() createTrack: CreateTrackDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!createTrack.name || !createTrack.duration) {
      res.status(HttpStatus.BAD_REQUEST);
    } else {
      res.status(HttpStatus.CREATED);
      return this.trackService.createTrack(createTrack);
    }
  }

  @Put(':id')
  updateTrack(
    @Body() updateTrack: UpdateTrackDto,
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST);
    } else {
      const status = this.trackService.updateTrack(updateTrack, id);
      if (status === '404') {
        res.status(HttpStatus.NOT_FOUND);
      } else {
        res.status(HttpStatus.OK);
        return status;
      }
    }
  }

  @Delete(':id')
  deleteTrack(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!uuidValidate(id)) {
      res.status(HttpStatus.BAD_REQUEST);
    } else {
      const status = this.trackService.deleteTrack(id);
      status === '404'
        ? res.status(HttpStatus.NOT_FOUND)
        : res.status(HttpStatus.NO_CONTENT);
    }
  }
}
