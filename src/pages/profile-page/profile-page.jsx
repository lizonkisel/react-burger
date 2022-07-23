import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from './profile-page.module.css';
import formStyles from '../inputs-pages.module.css';

import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import ProfileMenu from '../../components/profile-menu/profile-menu.jsx';
import { editUser } from "../../services/actions/user";
import { regExp } from "../../utils/utils";


export default function ProfilePage() {

  const currentName = useSelector(store => store.auth.user.name);
  const currentEmail = useSelector(store => store.auth.user.email);

  const [nameValue, setNameValue] = React.useState(currentName);
  const [loginValue, setLoginValue] = React.useState(currentEmail);
  const [passwordValue, setPasswordValue] = React.useState('');
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setIsButtonsVisible(true);
  };

  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const [isInvalidInputs, setIsInvalidInputs] = useState(false);
  const [isButtonsVisible, setIsButtonsVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (!isNameError && !isEmailError && !isPasswordError) ? setIsInvalidInputs(false) : setIsInvalidInputs(true)
  }, [isNameError, isEmailError, isPasswordError]);

  function validateName() {
    if (nameValue.length >=2 && nameValue.length < 21) {
      setIsNameError(false)
    } else {
      setIsNameError(true);
      setIsInvalidInputs(true)
    }
    // (nameValue.length >=2 && nameValue.length < 21) ? (setIsNameError(false)) : (setIsNameError(true), setIsInvalidInputs(true));
  };

  function validateEmail() {
    if (regExp.test(loginValue)) {
      setIsEmailError(false)
    } else {
      setIsEmailError(true);
      setIsInvalidInputs(true)
    }
  };

  function validatePassword() {
    // if (passwordValue.length === 0 || (passwordValue.length >=8 && passwordValue.length < 21)) {
    if ((passwordValue.length >=8 && passwordValue.length < 21)) {
      setIsPasswordError(false)
    } else {
      setIsPasswordError(true);
      setIsInvalidInputs(true)
    }
    // (passwordValue.length >=8 && passwordValue.length < 21) ? (setIsPasswordError(false)) : (setIsPasswordError(true), setIsInvalidInputs(true));
  }

  function checkFormValidity() {
    validateName();
    validateEmail();
    validatePassword();
  }

  function clearEmailErrors() {
    setIsEmailError(false);
  };

  function clearNameErrors() {
    setIsNameError(false)
  };

  function clearPasswordErrors() {
    setIsPasswordError(false)
  };

  function clearAllErrors() {
    clearEmailErrors();
    clearNameErrors();
    clearPasswordErrors();
  };

  function resetNewData(e) {
    e.preventDefault();
    clearAllErrors();
    if (isInvalidInputs) {
      return null
    };
    setNameValue(currentName);
    setLoginValue(currentEmail);
    setPasswordValue('');
    setIsButtonsVisible(false);
  };

  const changeUserData = async (newUserData) => {
    await dispatch(editUser(newUserData));
  };

  const editCurrentUser = async (e) => {
    e.preventDefault();
    checkFormValidity();
    const newUserData = {
      'name': nameValue,
      'email': loginValue,
      'password': passwordValue
    };
    console.log(newUserData);
    changeUserData(newUserData).then(() => {
      setIsButtonsVisible(false);
      console.log("Edit User");
    });
  };


  return (
    <main className={styles.main}>

      <ProfileMenu />

      <form className={formStyles.form} action="" onSubmit={editCurrentUser}>
        <fieldset className={formStyles.fieldset}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => {setIsButtonsVisible(true); setNameValue(e.target.value)}}
            onFocus={clearNameErrors}
            onBlur={validateName}
            icon={'EditIcon'}
            value={nameValue}
            name={'name'}
            error={isNameError}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Длина имени должна быть от 2 до 20 символов'}
            size={'default'}
          />
          <Input
            type={'text'}
            placeholder={'Логин'}
            onChange={e => {setIsButtonsVisible(true); setLoginValue(e.target.value)}}
            onFocus={clearEmailErrors}
            onBlur={validateEmail}
            icon={'EditIcon'}
            value={loginValue}
            name={'email'}
            error={isEmailError}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Введите корректный адрес электронной почты'}
            size={'default'}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={e => {setIsButtonsVisible(true); setPasswordValue(e.target.value)}}
            onFocus={clearPasswordErrors}
            onBlur={validatePassword}
            icon={'EditIcon'}
            value={passwordValue}
            name={'name'}
            error={isPasswordError}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Пароль должен содержать от 8 до 20 символов'}
            size={'default'}
            required={false}
          />
        </fieldset>
        <div className={`${styles.buttons_wrapper} ${isButtonsVisible ? styles.buttons_wrapper_visible : null}`}>
          <Button type="secondary" size="medium" onClick={resetNewData}>
            Отмена
          </Button>
          {/* <Button type="primary" size="medium" onClick={editCurrentUser} disabled={isInvalidInputs}> */}
          <Button type="primary" size="medium" disabled={isInvalidInputs}>
            Сохранить
          </Button>
        </div>
      </form>
    </main>
  )
}
