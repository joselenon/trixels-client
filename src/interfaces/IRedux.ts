import { IUser } from './IUser';

export interface IAuthState {
  userCredentials: IUser | undefined;
}
