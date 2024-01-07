import AxiosService from '../services/AxiosService';

export default async function saveDataInJSON(data: any) {
  const postRequest = await AxiosService({
    url: 'http://localhost:3008/api/saveresources',
    method: 'post',
    data,
  });

  return postRequest;
}
