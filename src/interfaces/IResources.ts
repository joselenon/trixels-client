export type TResourcesTypes = 'chicken' | 'slugger' | 'mine';

export interface IResourceInfoCreationPayload {
  resourceType: TResourcesTypes;
  cooldown: number;
  landNumber: number;
  startTime: number;
  account: string;
}

export interface IUserResourceFrontEnd {
  resourceType: TResourcesTypes;
  landNumber: number;
  startTime?: number;
  account: string;
}

export interface IUserResourcesRedis {
  [resourceId: string]: IUserResourceFrontEnd;
}

export interface IUserResourceResponse {
  [userResourceId: string]: IUserResourceFrontEnd;
}
