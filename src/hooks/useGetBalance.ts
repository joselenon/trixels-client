import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { useBalanceContext } from '../contexts/BalanceContext';

export default function useGetBalance() {
  const errorAlreadyDisplayed = useRef(false);
  const [updatedBalance, setUpdatedBalance] = useState<null | number>(null);

  const { balance } = useBalanceContext();
  const { data, liveData } = balance;

  useEffect(() => {
    if (liveData) {
      if (liveData.getLiveBalance.success) {
        errorAlreadyDisplayed.current = false;
        return setUpdatedBalance(liveData.getLiveBalance.data.balance);
      } else {
        !errorAlreadyDisplayed.current && toast.error(liveData.getLiveBalance.message);
        errorAlreadyDisplayed.current = true;
        return;
      }
    }

    if (data) {
      if (data.getBalance.success) {
        errorAlreadyDisplayed.current = false;
        return setUpdatedBalance(data.getBalance.data.balance);
      } else {
        !errorAlreadyDisplayed.current && toast.error(data.getBalance.message);
        errorAlreadyDisplayed.current = true;
        return;
      }
    }
  }, [balance]);

  return updatedBalance;
}
