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
  id: string,
  isPreview?: boolean
}

export const Column = ({ isPreview, text, id, index }: ColumnProps) => {
  const {
    state: { lists, ...state },
    createTask,
    moveList,
    moveTask
  } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const [ , drop ] = useDrop({
    accept: [ types.COLUMN, types.CARD ],
    hover(item: DragItem) {
      if (item.type === types.COLUMN) {
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        moveList({ dragIndex, hoverIndex });

        item.index = hoverIndex;
      } else {
        const dragIndex = item.index;
        const hoverIndex = 0;
        const sourceColumn = item.columnId;
        const targetColumn = id;

        if (sourceColumn === targetColumn) {
          return;
        }

        moveTask({ dragIndex, hoverIndex, sourceColumn, targetColumn });

        item.index = hoverIndex;
        item.columnId = targetColumn;
      }
    }
  });
  const { drag } = useItemDrag({ type: types.COLUMN, text, id, index });

  useEffect(() => {
    drag(drop(ref));
  }, [ drag, drop ]);

  return (
    <ColumnContainer
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden(isPreview, state.draggedItem, types.COLUMN, id)}
    >
      <ColumnTitle>{text}</ColumnTitle>

      {lists[index]?.tasks?.map((task, i) => (
        <Card
          key={task.id}
          text={task.text}
          id={task.id}
          index={i}
          columnId={id}
        />
      ))}

      <AddItem
        dark
        onAdd={(text) => createTask(text, id)}
        toggleButtonText="+ Add another task"
      />
    </ColumnContainer>
  );
};
