import React, { useState } from 'react';
import { Button, FormContainer, TextField } from './styles';

interface FormProps {
  onAdd(text: string): void
}

export const Form = ({ onAdd }: FormProps) => {
  const [ value, setValue ] = useState('');

  const handleTextField = (event: any) => {
    setValue(event.target.value);
  };

  const handleAddValue = () => {
    onAdd(value);
  };

  return (
    <FormContainer>
      <TextField value={value} onChange={handleTextField} />

      <Button onClick={handleAddValue}>
        Create
      </Button>
    </FormContainer>
  );
};
