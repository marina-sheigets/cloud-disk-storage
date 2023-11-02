import { useState } from 'react';
import Input from '../input/Input';
import './registration.less';
import { registration } from '../../actions/user';

function Registration() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};
	return (
		<div className='registration'>
			<div className='registration__header'>Registration</div>
			<Input
				value={email}
				onChange={handleChangeEmail}
				type='email'
				placeholder={'Enter your email'}></Input>
			<Input
				value={password}
				onChange={handleChangePassword}
				type='password'
				placeholder={'Enter your password'}></Input>
			<button className='registration__btn' onClick={() => registration(email, password)}>
				Create account
			</button>
		</div>
	);
}

export default Registration;
