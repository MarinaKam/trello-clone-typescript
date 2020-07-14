import { useDrag } from 'react-dnd';
import { useAppState } from '../AppProvider';
import { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragItem } from './DragItem';

export const useItemDrag = (item: DragItem) => {
  const { onDragItem, onResetDragItem } = useAppState();
  const [, drag, preview ] = useDrag({
    item,
    begin: onDragItem(item),
    end: onResetDragItem
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [ preview ]);

  return { drag };
};
