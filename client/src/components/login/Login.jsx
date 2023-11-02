import { useState } from 'react';
import Input from '../input/Input';
import '../registration/registration.less';
import { login } from '../../actions/api/user.js';
import { useDispatch } from 'react-redux';

function Login() {
	const dispatch = useDispatch();
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
			<div className='registration__header'>Login</div>
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
			<button className='registration__btn' onClick={() => dispatch(login(email, password))}>
				Log in
			</button>
		</div>
	);
}

export default Login;
