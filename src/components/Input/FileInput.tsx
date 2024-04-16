/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { IFileInput } from '../../interfaces/IRHF';
import TrixelsButton from '../TrixelsButton';

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  h3 {
    font-family: var(--bai-font);
    font-size: 14px;
  }

  input {
    width: 100%;
    font-family: var(--bai-font);
    background-color: #3d3d3d;
    border-radius: var(--default-br);
    padding: var(--default-pdn) 5px;
    color: white;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
`;

export const ErrorMessage = styled.span`
  font-size: 14px;
  color: red;
`;

const SelectedFilesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  ul {
    overflow: scroll;
  }
`;

const FilesListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;

  h3 {
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export default function FileInput({ id, options, rhfConfig, setValue, resetCalled }: IFileInput) {
  const {
    rhfErrors,
    rhfRegister,
    rhfValidationFn = () => {
      return { valid: true, errorMsg: '' };
    },
  } = rhfConfig;

  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files.length > 0) {
      for (const file of files) {
        setFiles((prev) => [...prev, file]);
      }
    }
  };

  const [validationValue, setValidationValue] = useState({
    valid: false,
    errorMsg: '',
  });

  const readJSON = async (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (event: any) => {
        const fileContent = event.target.result;
        const obj = JSON.parse(fileContent);
        resolve(obj);
      };
      reader.readAsText(file);
    });
  };

  const convertMediaToBase64: (file: File) => Promise<string> = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imageData = e.target?.result;
        if (imageData) {
          resolve(String(imageData));
        }
        reject();
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    const processFiles = async () => {
      const obj: {
        json: any;
        photos: { filename: string; base64: string }[];
        videos: { filename: string; base64: string }[];
        audios: { filename: string; base64: string }[];
      } = {
        json: {},
        photos: [],
        videos: [],
        audios: [],
      };

      for (const file of files) {
        if (file.type === 'application/json') {
          const instaChat = await readJSON(file);
          obj.json = instaChat;
        }

        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
          const base64Image = await convertMediaToBase64(file);
          obj.photos.push({ filename: file.name, base64: base64Image });
        }

        if (file.type === 'video/mp4') {
          const base64 = await convertMediaToBase64(file);
          if (file.name.startsWith('audio')) {
            obj.audios.push({ filename: file.name, base64 });
          } else {
            obj.videos.push({ filename: file.name, base64 });
          }
        }
      }

      setValue(id, obj);
    };

    processFiles();
  }, [files]);

  useEffect(() => {
    setFiles([]);
  }, [resetCalled]);

  const validation = (value: any) => {
    const validate = rhfValidationFn(value);
    setValidationValue(validate);
    return validate;
  };

  // rhfRegister is responsible to set the payload keys with the id and the input submittion options (ex: validate)
  const { ...registerProps } = rhfRegister(id, {
    valueAsNumber: options.type === 'number',
    validate: (value: any) => {
      const { valid } = validation(value);
      return valid;
    },
  });

  return (
    <InputContainer>
      <input
        style={{
          opacity: 0,
          position: 'absolute',
          width: 0,
          color: options.disabled ? '#cecece' : 'white',
        }}
        id={id}
        {...options}
        {...registerProps}
        onChange={handleFileChange}
        aria-invalid={rhfErrors[id] ? 'true' : 'false'}
      />
      <label htmlFor={id}>
        <TrixelsButton
          attributes={{
            id: id,
            type: 'button',
            onClick: () => {
              document.getElementById(id)?.click();
            },
          }}
          btnType="BLUE"
          label="Adicionar Arquivos"
        />
      </label>

      {rhfErrors[id] && rhfErrors[id]!.type === 'required' && <ErrorMessage>Campo obrigatório.</ErrorMessage>}
      {rhfErrors[id] && rhfErrors[id]!.type === 'validate' && <ErrorMessage>{validationValue.errorMsg}</ErrorMessage>}

      <SelectedFilesContainer>
        <h2>Arquivos Selecionados</h2>

        {files.length > 0 && (
          <FilesListContainer>
            {files.map((file, index) => (
              <h3 key={index}>{file.name}</h3>
            ))}
          </FilesListContainer>
        )}
      </SelectedFilesContainer>
    </InputContainer>
  );
}
