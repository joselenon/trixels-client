import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { useBalanceContext } from '../contexts/BalanceContext';

interface IUseGetBalanceReturn {
  updatedBalance: number | undefined;
}

export default function useGetBalance(): IUseGetBalanceReturn {
  const { balance } = useBalanceContext();

  const errorAlreadyDisplayed = useRef(false);

  const [updatedBalance, setUpdatedBalance] = useState<undefined | number>(undefined);

  const { data, liveData } = balance;

  useEffect(() => {
    if (liveData) {
      if (liveData.getLiveBalance.success) {
        errorAlreadyDisplayed.current = false;
        return setUpdatedBalance(liveData.getLiveBalance!.data!.balance);
      } else {
        !errorAlreadyDisplayed.current && toast.error(liveData.getLiveBalance.message);
        errorAlreadyDisplayed.current = true;
        return;
      }
    }

    if (data) {
      if (data.getBalance.success) {
        errorAlreadyDisplayed.current = false;
        return setUpdatedBalance(data.getBalance!.data!.balance);
      } else {
        !errorAlreadyDisplayed.current && toast.error(data.getBalance.message);
        errorAlreadyDisplayed.current = true;
        return;
      }
    }
  }, [balance]);

  return { updatedBalance };
}
