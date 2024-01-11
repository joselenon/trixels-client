export interface IResourceInfoCreationPayload {
  resourceName: string;
  cooldown: number;
  landNumber: number;
  startTime: number;
  acc: string;
}

export interface IUserResourceFrontEnd {
  resourceName: string;
  landNumber: number;
  startTime?: number;
}

export interface IUserResourcesRedis {
  [resourceId: string]: IUserResourceFrontEnd;
}

export interface IUserResourceResponse {
  [userResourceId: string]: IUserResourceFrontEnd;
}
