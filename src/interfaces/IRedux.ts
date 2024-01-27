import { IUser, IUserToFrontEnd } from './IUser';

export interface IReduxStore {
  auth: { userCredentials: IUserToFrontEnd | undefined };
}
