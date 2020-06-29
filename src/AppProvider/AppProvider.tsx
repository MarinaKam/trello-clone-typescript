import React, { createContext, useContext } from 'react';
import { AppState, data } from './data';

interface AppContextProps {
  state: AppState
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const useAppState = () => useContext(AppContext);

export const AppProvider = ({ children }: React.PropsWithChildren<{}>) => {

  const providerValue = {
    state: data
  };

  return (
    <AppContext.Provider value={providerValue}>
      {children}
    </AppContext.Provider>
  );
};
