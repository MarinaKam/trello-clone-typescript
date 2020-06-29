import React from 'react';
import { Column } from './Column';
import { AppContainer } from './styles';
import { AddItem } from './Form/AddItem';
import { useAppState } from './AppProvider';

export const App = () => {
  const { state: { lists }, createList } = useAppState();

  return (
    <AppContainer>
      {lists?.map((list, i) => (
        <Column id={list.id} key={list.id} text={list.text} index={i}/>
      ))}

      <AddItem
        onAdd={createList}
        toggleButtonText="+ Add another list"
      />
    </AppContainer>
  );
};
