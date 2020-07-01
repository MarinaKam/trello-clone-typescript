import React, { createContext, useContext, useReducer } from 'react';
import { DragItem } from '../DragItem';
import { AppState, data } from './data';
import { reducer } from './reducer';
import * as types from './types';

interface AppContextProps {
  state: AppState,
  createList(text: string): void,
  createTask(text: string, id: string): void,
  onDragItem(item: DragItem | undefined): () => void,
  onResetDragItem(): void,
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const useAppState = () => useContext(AppContext);

export const AppProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [ state, dispatch ] = useReducer(reducer, data);

  const createList = (text: string) => {
    dispatch({ type: types.ADD_LIST, payload: text });
  };

  const createTask = (text: string, id: string) => {
    dispatch({ type: types.ADD_TASK, payload: { text, taskId: id } });
  };

  const onDragItem = (item: DragItem) => () => {
    dispatch({ type: types.SET_DRAGGED_ITEM, payload: item });
  };

  const onResetDragItem = () => {
    dispatch({ type: types.SET_DRAGGED_ITEM, payload: undefined });
  };

  const providerValue = {
    state,

    // functions
    createList,
    createTask,
    onDragItem,
    onResetDragItem
  };

  return (
    <AppContext.Provider value={providerValue}>
      {children}
    </AppContext.Provider>
  );
};
