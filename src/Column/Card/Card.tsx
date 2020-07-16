import React, { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import * as types from '../../DragItem/types';
import { CardContainer } from './styles';
import { CardDragItem, useItemDrag } from '../../DragItem';
import { useAppState } from '../../AppProvider';
import { isHidden } from '../../helpers';

interface CardProps {
  text: string,
  id: string,
  index: number,
  columnId: string,
  isPreview?: boolean
}
export const Card = ({
  text,
  id,
  index,
  columnId,
  isPreview
}: CardProps) => {
  const { state, moveTask } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: types.CARD, text, id, index, columnId });
  const [, drop] = useDrop({
    accept: types.CARD,
    hover(item: CardDragItem) {
      if (item.type === types.CARD) {
        if (item.id === id) {
          return;
        }

        const dragIndex = item.index;
        const hoverIndex = index;
        const sourceColumn = item.columnId;
        const targetColumn = columnId;

        moveTask({ hoverIndex, dragIndex, sourceColumn, targetColumn });
        item.index = hoverIndex;
        item.columnId = targetColumn;
      }
    }
  });

  useEffect(() => {
    drag(drop(ref));
  }, [ drag, drop ]);

  return (
    <CardContainer
      isHidden={isHidden(isPreview, state.draggedItem, types.CARD, id)}
      isPreview={isPreview}
      ref={ref}
    >
      {text}
    </CardContainer>
  );
};
