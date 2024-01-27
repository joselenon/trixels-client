import URLS from '../config/constants/URLS';
import { MyAxiosService } from '../services/MyAxiosService';

export interface IRedeemCodePayload {
  code: string;
}

export default function useRedeemCode() {
  const handleRedeemCode = async (payload: IRedeemCodePayload) => {
    const res = await MyAxiosService({
      endpoint: URLS.ENDPOINTS.DEPOSIT.code,
      data: payload,
      method: 'post',
    });
    return res;
  };

  return handleRedeemCode;
}
