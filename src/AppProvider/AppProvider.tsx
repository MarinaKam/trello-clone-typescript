import React, { createContext, useContext, useReducer } from 'react';
import { AppState, data } from './data';
import { reducer } from './reducer';
import * as types from './types';

interface AppContextProps {
  state: AppState,
  createList: (text: string) => undefined | void,
  createTask: (text: string, id: string) => void | undefined,
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

  const providerValue = {
    state,

    // functions
    createList,
    createTask
  };

  return (
    <AppContext.Provider value={providerValue}>
      {children}
    </AppContext.Provider>
  );
};
