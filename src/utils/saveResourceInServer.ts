import { MyApiAxiosService } from '../services/AxiosService';

export default async function saveResourceInServer(data: any) {
  const postRequest = await MyApiAxiosService({
    url: 'http://localhost:3008/api/saveresources',
    method: 'post',
    data,
  });

  return postRequest;
}
