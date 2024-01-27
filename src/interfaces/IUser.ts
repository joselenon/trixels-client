export interface IUser {
  username: string;
  avatar?: string;
  balance: number;
  email: {
    value: string;
    verified: boolean;
    lastEmail: string;
    updatedAt: number;
  };
  ronin_wallet: {
    value: string;
    lastWallet: string;
    updatedAt: number;
  };
  createdAt: number;
}

export interface IUserUpdatePayload {
  email?: string;
}

export interface IUserJWTPayload {
  userDocId: string;
  username: string;
  avatar?: string;
}

export interface IUserToFrontEnd {
  username: string;
  avatar?: string;
  balance?: number;
  email?: {
    value: string;
    verified: boolean;
    lastEmail: string;
    updatedAt: number;
  };
  ronin_wallet: {
    value: string;
  };
  createdAt: number;
}
