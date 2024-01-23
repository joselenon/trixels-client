import { toast } from 'react-toastify';

import { IUserResourcesRedis } from '../interfaces/IUserResources';
import { MyAxiosService } from '../services/MyAxiosService';

export default async function getTimersFromServer(
  timersAcc: string,
): Promise<IUserResourcesRedis | undefined> {
  if (!timersAcc) {
    toast.error('Invalid request');
    return undefined;
  }

  const data = await MyAxiosService<IUserResourcesRedis>({
    method: 'get',
    endpoint: `/saveresources?acc=${timersAcc}`,
  });

  if (!data) return undefined;

  return data.api.data;
}
