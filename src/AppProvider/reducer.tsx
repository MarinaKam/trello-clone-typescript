import { v4 as uuidv4 } from 'uuid';
import { findItemById } from '../utils';
import { AppState } from './data';
import * as types from './types';

type Action =
  | {
      type: types.ADD_LIST,
      payload: string
    }
  | {
      type: types.ADD_TASK,
      payload: { text: string; taskId: string }
    };

export const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case types.ADD_LIST:
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: uuidv4(), text: action.payload, tasks: []}
        ]
      };

    case types.ADD_TASK:
      const index = findItemById(state.lists, action.payload.taskId);

      state.lists[index].tasks.push({
        id: uuidv4(),
        text: action.payload.text
      });

      return {
        ...state
      };

    default:
      return state;
  }
};