import React from 'react';
import { AddItem } from '../Form/AddItem';
import { useAppState } from '../AppProvider';
import { Card } from './Card';
import { ColumnContainer, ColumnTitle } from './styles';

interface ColumnProps {
  text: string,
  index: number
}

export const Column = ({ text, index }: ColumnProps) => {
  const { state: { lists } } = useAppState();

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>

      {lists[index]?.tasks?.map((task) => (
        <Card key={task.id} text={task.text} />
      ))}

      <AddItem
        dark
        onAdd={console.log}
        toggleButtonText="+ Add another task"
      />
    </ColumnContainer>
  );
};
