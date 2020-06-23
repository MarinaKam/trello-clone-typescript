import React, { useState } from 'react';
import { AddItemButton } from './styles';
import { Form } from '../Form';

interface AddItemProps {
  onAdd(text: string): void,
  toggleButtonText: string,
  dark?: boolean
}

export const AddItem = ({ onAdd, toggleButtonText, dark }: AddItemProps) => {
  const [ showForm, setShowForm ] = useState(false);

  const createItem = (value: string) => {
    onAdd(value);
    setShowForm(false);
  };

  if (showForm) {
    return <Form onAdd={createItem}/>
  }

  const handleToggleShow = () => {
    setShowForm(state => !state);
  };

  return (
    <AddItemButton dark={dark} onClick={handleToggleShow}>
      {toggleButtonText}
    </AddItemButton>
  );
};
