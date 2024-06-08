import URLS from '../config/constants/URLS';
import MyAxiosServiceInstance from '../services/MyAxiosService';

export interface IRedeemCodePayload {
  code: string;
}

export default function useRedeemCode() {
  const handleRedeemCode = async (payload: IRedeemCodePayload) => {
    const res = await MyAxiosServiceInstance.request({
      endpoint: URLS.ENDPOINTS.DEPOSIT.REDEEM_CODE,
      data: payload,
      method: 'post',
    });
    return res;
  };

  return handleRedeemCode;
}
