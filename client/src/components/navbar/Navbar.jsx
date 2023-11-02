import { useNavigate } from 'react-router-dom';
import './navbar.less';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth } from '../../selectors';
import { logOut } from '../../actions/creators';
function Navbar() {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const isAuth = useSelector(getIsAuth);

	const toLoginModal = () => {
		navigate('/login');
	};

	const toRegisterModal = () => {
		navigate('/registration');
	};

	const logout = () => {
		dispatch(logOut());
	};
	return (
		<div className='navbar'>
			<div className='container'>
				<img src='' alt='' className='navbar__logo' />
				<div className='navbar__header'>Disk Cloud</div>
				{isAuth ? (
					<div className='navbar__login' onClick={logout}>
						Logout
					</div>
				) : (
					<>
						<div className='navbar__login' onClick={toLoginModal}>
							Login
						</div>
						<div className='navbar__registration' onClick={toRegisterModal}>
							Create account
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Navbar;
