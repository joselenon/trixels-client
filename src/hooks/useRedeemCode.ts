import URLS from '../config/constants/URLS';
import TrixelsAxiosServiceInstance from '../services/TrixelsAxiosService';

export interface IRedeemCodePayload {
  codeValue: string;
}

export default function useRedeemCode() {
  const handleRedeemCode = async (payload: IRedeemCodePayload) => {
    const res = await TrixelsAxiosServiceInstance.request({
      requestConfig: { url: URLS.ENDPOINTS.DEPOSIT.REDEEM_CODE, data: payload, method: 'post' },
      showSuccessErrorToast: [false, true],
    });
    return res;
  };

  return { handleRedeemCode };
}
