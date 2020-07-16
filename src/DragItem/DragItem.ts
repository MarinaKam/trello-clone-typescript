import * as types from './types';

export type ColumnDragItem = {
  index: number,
  id: string,
  text: string,
  type: types.COLUMN
};

export type CardDragItem = {
  index: number,
  id: string,
  columnId: string,
  text: string,
  type: types.CARD
};

export type DragItem = CardDragItem | ColumnDragItem;
