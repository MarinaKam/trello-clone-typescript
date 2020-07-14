import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { App } from './App';
import { AppProvider } from './AppProvider';
import './index.css';

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <AppProvider>
      <App />
    </AppProvider>
  </DndProvider>,
  document.getElementById('root')
);
