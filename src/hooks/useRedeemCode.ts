import URLS from '../config/constants/URLS';
import TrixelsAxiosServiceInstance from '../services/TrixelsAxiosService';

export interface IRedeemCodePayload {
  code: string;
}

export default function useRedeemCode() {
  const handleRedeemCode = async (payload: IRedeemCodePayload) => {
    const res = await TrixelsAxiosServiceInstance.request({
      requestConfig: { url: URLS.ENDPOINTS.DEPOSIT.REDEEM_CODE, data: payload, method: 'post' },
    });
    return res;
  };

  return handleRedeemCode;
}
