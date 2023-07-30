import { Track, User } from "src/interfaces/interfaces";
import { v4 as uuidv4 } from 'uuid';

const testUser: User = {
  id: uuidv4(),
  login: 'test-login',
  password: 'test-password-111',
  version: 1,
  createdAt: +(new Date()),
  updatedAt: +(new Date())
}
export const dbUsers: User[] = [testUser]


const testTrack = {
  id: uuidv4(),
  name: 'test-name-track',
  artistId: null,
  albumId: 'aa',
  duration: 365
}
export const dbTracks: Track[] = [testTrack]



