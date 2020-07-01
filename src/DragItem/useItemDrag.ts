import { useDrag } from 'react-dnd';
import { useAppState } from '../AppProvider';
import { DragItem } from './DragItem';

export const useItemDrag = (item: DragItem) => {
  const { onDragItem, onResetDragItem } = useAppState();
  const [, drag ] = useDrag({
    item,
    begin: onDragItem(item),
    end: onResetDragItem
  });

  return { drag };
};
