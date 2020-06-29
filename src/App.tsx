import React from 'react';
import { Column } from './Column';
import { AppContainer } from './styles';
import { AddItem } from './Form/AddItem';
import { useAppState } from './AppProvider';

export const App = () => {
  const { state: { lists } } = useAppState();

  return (
    <AppContainer>
      {lists?.map((item, i) => (
        <Column key={item.id} text={item.text} index={i}/>
      ))}

      <AddItem
        onAdd={console.log}
        toggleButtonText="+ Add another list"
      />
    </AppContainer>
  );
};
