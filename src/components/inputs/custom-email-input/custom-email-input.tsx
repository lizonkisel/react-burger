import React, { ChangeEventHandler } from 'react';
import {EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';

export default function CustomEmailInput() {
  const [value, setValue] = React.useState<string>('')
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }
  return (<EmailInput onChange={onChange} value={value} name={'email'} />)
}
