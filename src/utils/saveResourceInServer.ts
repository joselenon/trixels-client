import { MyAxiosService } from '../services/MyAxiosService';

export default async function saveResourceInServer(data: any) {
  const postRequest = await MyAxiosService({
    endpoint: '/saveresources',
    method: 'post',
    data,
  });

  return postRequest;
}
