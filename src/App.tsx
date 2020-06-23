import React from 'react';
import { Card, Column } from './Column';
import { AppContainer } from './styles';
import { AddItem } from './Form/AddItem';

export const App = () => {
  return (
    <AppContainer>
      <Column text="To Do">
        <Card text="Generate app scaffold" />
      </Column>

      <Column text="In Progress">
        <Card text="Learn Typescript" />
      </Column>

      <Column text="Done">
        <Card text="Begin to use static typing" />
      </Column>

      <AddItem onAdd={console.log} toggleButtonText="+ Add another list" />
    </AppContainer>
  );
};
