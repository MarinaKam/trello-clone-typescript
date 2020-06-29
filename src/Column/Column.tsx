import React from 'react';
import { AddItem } from '../Form/AddItem';
import { useAppState } from '../AppProvider';
import { Card } from './Card';
import { ColumnContainer, ColumnTitle } from './styles';

interface ColumnProps {
  text: string,
  index: number,
  id: string
}

export const Column = ({ text, id, index }: ColumnProps) => {
  const { state: { lists }, createTask } = useAppState();

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>

      {lists[index]?.tasks?.map((task) => (
        <Card key={task.id} text={task.text} />
      ))}

      <AddItem
        dark
        onAdd={(text) => createTask(text, id)}
        toggleButtonText="+ Add another task"
      />
    </ColumnContainer>
  );
};
