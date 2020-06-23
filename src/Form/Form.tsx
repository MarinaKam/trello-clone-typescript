import React, { useState } from 'react';
import { useFocus } from '../utils/useFocus';
import { Button, FormContainer, TextField } from './styles';

interface FormProps {
  onAdd(text: string): void
}

export const Form = ({ onAdd }: FormProps) => {
  const [ value, setValue ] = useState('');
  const inputRef = useFocus();

  const handleTextField = (event: any) => {
    setValue(event.target.value);
  };

  const handleAddValue = () => {
    onAdd(value);
  };

  return (
    <FormContainer>
      <TextField ref={inputRef} value={value} onChange={handleTextField} />

      <Button onClick={handleAddValue}>
        Create
      </Button>
    </FormContainer>
  );
};
