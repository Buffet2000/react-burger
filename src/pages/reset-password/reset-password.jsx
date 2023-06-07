import React, { useState } from 'react';
import styles from './reset-password.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/actions/password-reset';

export default function ResetPassword() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const inputRef = React.useRef(null);
	const { verificationSent } = useSelector((store) => store.resetPassword);

	const onIconClick = () => {
		setTimeout(() => inputRef.current.focus(), 0)
	}

	const [newPasswordInfo, setNewPasswordInfo] = useState(
    {
      newPassword: "",
      token: ""
    })


	const onChange = e => {
		setNewPasswordInfo({ ...newPasswordInfo, [e.target.name]: e.target.value });
	}

	const resetPass = e => {
		e.preventDefault();
		dispatch(resetPassword(newPasswordInfo.newPassword, newPasswordInfo.token));
		navigate('/login');
	}

	if (!verificationSent) {
    navigate('/forgot-password')
  }

	return (
		<form onSubmit={resetPass} className={styles.inputContainer}>
			<h2 className="text text_type_main-medium">Восстановление пароля</h2>
			<PasswordInput
				onChange={onChange}
				value={newPasswordInfo.newPassword}
				name={'newPassword'}
				placeholder={'Введите новый пароль'}
				icon="ShowIcon"
			/>
			<Input
				type={'text'}
				placeholder={'Введите код из письма'}
				onChange={onChange}
				value={newPasswordInfo.token}
				name={'token'}
				error={false}
				ref={inputRef}
				onIconClick={onIconClick}
				errorText={'Ошибка'}
				size={'default'}
				extraClass="ml-1"
			/>
			<Button htmlType="submit" type="primary" size="medium" >Сохранить</Button>
			<div className={styles.registration}>
				<p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login' className={styles.link} >Войти</Link></p>
			</div>
		</form>
	)
}