import { v4 as uuidv4 } from 'uuid';
import { findItemById } from '../utils';
import { AppState } from './data';
import * as types from './types';
import { moveItem } from '../helpers';
import { DragItem } from '../DragItem';

export type Action =
  | {
    type: types.ADD_LIST,
    payload: string
  }
  | {
    type: types.ADD_TASK,
    payload: { text: string; taskId: string }
  }
  | {
    type: types.MOVE_LIST,
    payload: {
      dragIndex: number,
      hoverIndex: number
    }
  }
  | {
    type: types.MOVE_TASK,
    payload: {
      dragIndex: number,
      hoverIndex: number,
      sourceColumn: string,
      targetColumn: string
    }
  }
  | {
    type: types.SET_DRAGGED_ITEM,
    payload: DragItem | undefined
  };

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case types.ADD_LIST: {
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: uuidv4(), text: action.payload, tasks: []}
        ]
      };
    }

    case types.ADD_TASK: {
      const index = findItemById(state.lists, action.payload.taskId);

      state.lists[index].tasks.push({
        id: uuidv4(),
        text: action.payload.text
      });

      return { ...state };
    }

    case types.MOVE_LIST: {
      const { dragIndex, hoverIndex } = action.payload;

      state.lists = moveItem(state.lists, dragIndex, hoverIndex);

      return { ...state };
    }

    case types.SET_DRAGGED_ITEM: {
      return {
        ...state,
        draggedItem: action.payload
      };
    }

    case types.MOVE_TASK: {
      const { dragIndex, hoverIndex, sourceColumn, targetColumn } = action.payload;
      const sourceLaneIndex = findItemById(state.lists, sourceColumn);
      const targetLaneIndex = findItemById(state.lists, targetColumn);
      const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0];

      state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item);

      return { ...state };
    }

    default: {
      return state;
    }
  }
};