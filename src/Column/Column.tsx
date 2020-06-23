import React, { PropsWithChildren } from 'react';
import { ColumnContainer, ColumnTitle } from './styles';
import { AddItem } from '../Form/AddItem';

interface ColumnProps {
  text: string
}

export const Column = ({ text, children }: PropsWithChildren<ColumnProps>) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>

      {children}

      <AddItem dark onAdd={console.log} toggleButtonText="+ Add another task" />
    </ColumnContainer>
  );
};
