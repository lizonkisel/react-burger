import React from 'react';
import {PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

export default function CustomPasswordInput() {
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value)
  }
  return (<PasswordInput onChange={onChange} value={value} name={'password'} />)
}
