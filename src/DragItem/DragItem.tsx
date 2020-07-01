import * as types from './types';

export type ColumnDragItem = {
  index: number,
  id: string,
  text: string,
  type: types.COLUMN
}

export type DragItem = ColumnDragItem;
