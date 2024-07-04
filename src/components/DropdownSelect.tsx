import React, { useState } from 'react';
import styled from 'styled-components';

export const ItemButton = styled.button`
  background: white;
  border: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  user-select: none;

  h4 {
    color: #333;
    margin: 0;
  }

  &:hover {
    background: #f0f0f0; /* Subtle light grey for hover */
  }
`;

export const CustomSelectButton = styled(ItemButton)<{ $active: boolean }>`
  width: 100%;
  padding: 5px 10px;
  background: ${({ $active }) => ($active ? 'white' : 'var(--default-lightgrey)')}; /* White for active */

  &:hover {
    background: ${({ $active }) => ($active ? 'white' : '#e0e0e0')}; /* Lighter grey for hover */
  }

  img {
    margin-right: 5px;
    opacity: ${({ $active }) => ($active ? 1 : 0.7)}; /* Full opacity for active, reduced for inactive */
    transition: opacity 0.3s ease;
    filter: brightness(${({ $active }) => ($active ? 1 : 0.7)}); /* Adjust brightness based on $active */
  }

  h4 {
    color: ${({ $active }) => ($active ? 'black' : 'var(--default-grey)')}; /* Black text for active */
    margin: 0;
    font-size: 12px;
  }

  &:hover {
    h4 {
      color: var(--default-black) !important; /* Black text for hover */
    }
    img {
      filter: brightness(1); /* Brighten the icon on hover */
    }
  }
`;

const DropdownContainer = styled.div<{ $isOpened: boolean }>`
  position: absolute;
  top: 40px;
  width: 100%;
  display: ${({ $isOpened }) => ($isOpened ? 'block' : 'none')};
  flex-direction: column;
  background: white;
  z-index: 1;
  border: 2px solid grey;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for better separation */
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

interface IDropdownSelectProps<T> {
  selectedValue: T;
  options: T[];
  onSelect: (value: T) => void;
  renderOption: (option: T) => React.ReactNode;
  renderButton: (selectedValue: T) => React.ReactNode;
}

function DropdownSelect<T>({ selectedValue, options, onSelect, renderOption, renderButton }: IDropdownSelectProps<T>) {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const toggleDropdown = () => setIsDropdownOpened((prev) => !prev);

  const handleSelect = (value: T) => {
    onSelect(value);
    setIsDropdownOpened(false);
  };

  return (
    <DropdownWrapper>
      <CustomSelectButton $active={true} type="button" onClick={toggleDropdown}>
        {renderButton(selectedValue)}
      </CustomSelectButton>

      <DropdownContainer $isOpened={isDropdownOpened}>
        {options.map((option, i) => (
          <CustomSelectButton
            key={i}
            $active={selectedValue === option}
            type="button"
            onClick={() => handleSelect(option)}
          >
            {renderOption(option)}
          </CustomSelectButton>
        ))}
      </DropdownContainer>
    </DropdownWrapper>
  );
}

export default DropdownSelect;
