import React from 'react';

import useRedeemCode from '../../../hooks/useRedeemCode';
import { ICreateInput } from '../../../interfaces/IRHF';
import Button from '../../Button';
import Form from '../../Form';
import * as styles from './styles';

export default function RedeemCodeForm() {
  const handleRedeemCode = useRedeemCode();

  const validate = (arg: any) => {
    if (arg.length <= 0) {
      return { valid: false, errorMsg: 'Campo obrigatório' };
    }
    return { valid: true, errorMsg: '' };
  };

  const redeemCodeInput: ICreateInput = {
    componentKey: '',
    id: 'code',
    options: { type: 'text', required: true },
    label: '',
    rhfConfig: { rhfValidationFn: (arg) => validate(arg) },
  };

  const redeemButton = (
    <styles.RedeemButtonContainer>
      <Button btnType="CTA" label="Resgatar" attributes={{ type: 'submit' }} />
    </styles.RedeemButtonContainer>
  );

  const form = (
    <Form
      axiosCallHook={handleRedeemCode}
      InputContainer={({ children }) => <div>{children}</div>}
      inputArray={[redeemCodeInput]}
      submitButton={redeemButton}
    />
  );

  return form;
}
