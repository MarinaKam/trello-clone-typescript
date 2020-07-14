import React, { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { AddItem } from '../Form/AddItem';
import { useAppState } from '../AppProvider';
import * as types from '../DragItem/types';
import { DragItem, useItemDrag } from '../DragItem';
import { isHidden } from '../helpers';
import { Card } from './Card';
import { ColumnContainer, ColumnTitle } from './styles';

interface ColumnProps {
  text: string,
  index: number,
  id: string
}

export const Column = ({ text, id, index }: ColumnProps) => {
  const { state: { lists, ...state }, createTask, moveList } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: types.COLUMN, text, id, index });
  const [ , drop ] = useDrop({
    accept: types.COLUMN,
    hover(item: DragItem) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveList(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  useEffect(() => {
    drag(drop(ref));
  }, [ drag, drop ]);

  return (
    <ColumnContainer ref={ref} isHidden={isHidden(state.draggedItem, types.COLUMN, id)}>
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
