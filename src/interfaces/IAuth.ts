import { IUserToFrontEnd } from './IUser';

export interface IAuthResponse {
  userCredentials: IUserToFrontEnd;
  accessToken: string;
  refreshToken: string;
}
