import React, { useEffect, useRef } from 'react';
import { AddItem } from '../Form/AddItem';
import { useAppState } from '../AppProvider';
import * as types from '../DragItem/types';
import { useItemDrag } from '../DragItem';
import { Card } from './Card';
import { ColumnContainer, ColumnTitle } from './styles';

interface ColumnProps {
  text: string,
  index: number,
  id: string
}

export const Column = ({ text, id, index }: ColumnProps) => {
  const { state: { lists }, createTask } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: types.COLUMN, text, id, index });

  useEffect(() => {
    drag(ref);
  }, [ drag ]);

  return (
    <ColumnContainer ref={ref}>
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
