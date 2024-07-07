import React from 'react';
import styles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { sentVerificationEmail } from '../../services/actions/reset-password';
import { useDispatch } from '../../services/types/hooks';
import { useForm } from '../../services/types/hooks';

export default function ForgotPassword() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { values, handleChange } = useForm({ email: "" });

	const resetPassword = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(sentVerificationEmail(values.email, () => navigate('/reset-password')));
	}

	return (
		<>
			<form onSubmit={resetPassword} className={styles.inputContainer}>
				<h2 className="text text_type_main-medium">Password recovery</h2>
				<EmailInput
					onChange={handleChange}
					value={values.email}
					name={'email'}
					placeholder="Enter your E-mail"
					extraClass="mb-2"
				/>
				<Button htmlType="submit" type="primary" size="medium">Reset</Button>
				<div className={styles.registration}>
					<p className="text text_type_main-default text_color_inactive">Remember your password? <Link className={styles.link} to='/login'>Login</Link></p>
				</div>
			</form>
		</>
	)
}