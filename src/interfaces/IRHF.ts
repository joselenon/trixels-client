import { AxiosResponse } from 'axios';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form/dist/types/form';

import { IMyAPIResponse } from './IAPIResponse';

export interface IForm {
  // Function that will be used when form submits
  axiosCallHook: (
    payload: any,
  ) =>
    | Promise<AxiosResponse<IMyAPIResponse<any> | any> | undefined>
    | Promise<IMyAPIResponse<any> | any>;
  // In order to have custom style on inputs container
  InputContainer: React.ComponentType<{ children: React.ReactNode }>;
  inputArray: ICreateInput[];
  submitButton: JSX.Element;
}

/*
Captions
  axiosCallHook: used to pass hook responsible for sending the data do the server-side
  InputContainer: used to pass a father element to receive input elements (useful for customize styles). Prop Example: const DivContainer = ({children}) => <div className='example'>{children}</div>
  inputArray: used to pass all inputs that will be used by the form in one array
  submitButton: used to pass a custom styled button to the form
*/

interface IInputAttributes {
  type: 'number' | 'text' | 'file';
  multiple?: boolean;
  defaultValue?: string | number;
  required?: boolean;
  disabled?: boolean;
}

export interface ICreateInput {
  id: string;
  options: IInputAttributes;
  label: string;
  rhfConfig?: {
    rhfValidationFn: (value: any) => { valid: boolean; errorMsg: string };
  };
}
/*
Captions
  id: used as an identifier for RHF
  type: used to define input type
  multiple: used when input type is file and there's the option of uploading more than one file
  defaultValue: used to start the input with a specific value (for it to not start empty)
  label: used to create a "h3", with the value received, above the input]
  required: used to define if the input fill is required
  validationFn: used to validate input value before being sent (if there's any error, it sets and returns the message to 'errorMsg')
*/

export interface ITextInput {
  id: ICreateInput['id'];
  label: ICreateInput['label'];
  options: IInputAttributes;
  rhfConfig: {
    rhfRegister: UseFormRegister<FieldValues>;
    rhfErrors: FieldErrors;
    rhfValidationFn?: (value: any) => { valid: boolean; errorMsg: string };
  };
}

export interface IFileInput {
  id: ICreateInput['id'];
  options: IInputAttributes;
  label: ICreateInput['label'];
  rhfConfig: {
    rhfRegister: UseFormRegister<FieldValues>;
    rhfErrors: FieldErrors;
    rhfValidationFn?: (value: any) => { valid: boolean; errorMsg: string };
  };
  setValue: UseFormSetValue<FieldValues>;
  resetCalled: boolean;
}
