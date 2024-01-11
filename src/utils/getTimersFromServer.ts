import { toast } from 'react-toastify';

import { IUserResourcesRedis } from '../interfaces/IUserResources';
import { MyApiAxiosService } from '../services/AxiosService';

export default async function getTimersFromServer(
  timersAcc: string,
): Promise<IUserResourcesRedis | undefined> {
  if (!timersAcc) {
    toast.error('Invalid request');
    return undefined;
  }

  const data = await MyApiAxiosService<IUserResourcesRedis>({
    method: 'get',
    url: `http://localhost:3008/api/saveresources?acc=${timersAcc}`,
  });

  if (!data) return undefined;

  return data;
}
