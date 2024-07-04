import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

export interface ISection {
  id: string;
  label: string;
  content: ReactNode;
  color?: string; // Optional color property for each section
}

interface ISectionSelectorProps {
  sections: ISection[];
}

const SectionSelectionContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  display: flex;
  background-color: none;
  margin-bottom: 1.5rem;
`;

interface ISectionItemProps {
  $isSelected: boolean;
  $color?: string; // Optional color property
}

const SectionItem = styled.div<ISectionItemProps>`
  cursor: pointer;
  display: flex;
  gap: 12px;
  height: 100%;
  align-items: center;
  padding: 20px;
  white-space: nowrap;
  transition: all 0.15s;
  position: relative;
  flex: 1; /* This ensures each button takes up equal space */

  h5 {
    color: ${({ $isSelected, $color }) => ($isSelected ? $color || 'var(--default-blue)' : 'var(--default-grey)')};
    transition: color 0.15s;
    text-align: center;
    width: 100%; /* This centers the text within the button */
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ $isSelected, $color }) =>
      $isSelected ? $color || 'var(--default-blue)' : 'var(--default-grey)'};
    transition: background-color 0.15s;
  }

  &:hover {
    h5 {
      color: ${({ $color }) => $color || 'var(--default-blue)'};
    }
    svg {
      fill: ${({ $color }) => $color || 'var(--default-blue)'};
    }

    &::after {
      background-color: ${({ $color }) => $color || 'var(--default-blue)'};
    }
  }
`;

const SectionContentContainer = styled.div``;

const SectionSelector: React.FC<ISectionSelectorProps> = ({ sections }) => {
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id);

  const handleSectionClick = (id: string) => {
    setActiveSectionId(id);
  };

  const activeSection = sections.find((section) => section.id === activeSectionId);

  return (
    <div style={{ width: '100%' }}>
      <SectionSelectionContainer>
        {sections.map((section) => (
          <SectionItem
            key={section.id}
            $isSelected={section.id === activeSectionId}
            $color={section.color} // Pass the color prop to the styled component
            onClick={() => handleSectionClick(section.id)}
          >
            <h5>{section.label}</h5>
          </SectionItem>
        ))}
      </SectionSelectionContainer>

      {activeSection && <SectionContentContainer>{activeSection.content}</SectionContentContainer>}
    </div>
  );
};

export default SectionSelector;
