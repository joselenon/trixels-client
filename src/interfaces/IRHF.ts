import { FieldErrors } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import { UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

/*
Captions
  axiosCallHook: used to pass hook responsible for sending the data to the server-side
  InputContainer: used to pass a father element to receive input elements (useful for customize styles). Prop Example: const DivContainer = ({children}) => <div className='example'>{children}</div>
  inputArray: used to pass all inputs that will be used by the form in one array
  submitButton: used to pass a custom styled button to the form
*/

interface IInputAttributes {
  type: 'number' | 'text' | 'file' | 'password';
  multiple?: boolean;
  defaultValue?: string | number;
  required?: boolean;
  disabled?: boolean;
}

export interface ICreateInput {
  componentKey: string;
  id: string;
  options: IInputAttributes;
  label: string;
  rhfConfig?: {
    rhfValidationFn: (value: any, getValues?: UseFormGetValues<FieldValues>) => { valid: boolean; errorMsg: string };
  };
}
/*
Captions
  id: used as an identifier for RHF
  type: used to define input type
  multiple: used when input type is file and there's the option of uploading more than one file
  defaultValue: used to start the input with a specific value (for it to not start empty)
  label: used to create a "h3", with the value received, above the input
  required: used to define if the input fill is required
  validationFn: used to validate input value before being sent (if there's any error, it sets and returns the message to 'errorMsg')
*/

export interface ITextInput {
  componentKey: ICreateInput['componentKey'];
  id: ICreateInput['id'];
  label: ICreateInput['label'];
  options: IInputAttributes;
  rhfConfig: {
    rhfRegister: UseFormRegister<FieldValues>;
    rhfErrors: FieldErrors;
    rhfValidationFn?: (value: any, getValues?: UseFormGetValues<FieldValues>) => { valid: boolean; errorMsg: string };
    getValues: UseFormGetValues<FieldValues>;
  };
}

export interface IFileInput {
  componentKey: ICreateInput['componentKey'];
  id: ICreateInput['id'];
  options: IInputAttributes;
  label: ICreateInput['label'];
  rhfConfig: {
    rhfRegister: UseFormRegister<FieldValues>;
    rhfErrors: FieldErrors;
    rhfValidationFn?: (value: any, getValues?: UseFormGetValues<FieldValues>) => { valid: boolean; errorMsg: string };
  };
  setValue: UseFormSetValue<FieldValues>;
  resetCalled: boolean;
}
