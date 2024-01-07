import { toast } from 'react-toastify';

import IAPIResponse from '../interfaces/IAPIResponse';
import { TimerInfo } from '../pages/MyTimers';
import AxiosService from '../services/AxiosService';

export default async function getTimersFromServersJson(timersAcc: string) {
  if (!timersAcc) return toast.error('Invalid request');

  const fetchTimersData = await AxiosService<IAPIResponse<TimerInfo>>({
    method: 'get',
    url: `http://localhost:3008/api/saveresources?acc=${timersAcc}`,
  });

  if (!fetchTimersData.data) return undefined;
  return fetchTimersData.data.data;
}
