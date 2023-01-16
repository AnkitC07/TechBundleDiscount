import { TextField } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function TextFieldComp(props) {


  // const handleChange = useCallback((newValue) => setValue(newValue), []);

  return (
    <TextField
      type={props.type}
      suffix={props.suffix}
      value={props.value}
      onChange={props.onChange}
      autoComplete="off"
      placeholder={props.placeholder}
      min='0'
      max={'100'}
      disabled={props.disable}
    />
  );
}
export default TextFieldComp