import { useNavigate } from 'react-router-dom';
import './navbar.less';
function Navbar() {
	const navigate = useNavigate();
	const toLoginModal = () => {
		navigate('/login');
	};

	const toRegisterModal = () => {
		navigate('/registration');
	};
	return (
		<div className='navbar'>
			<div className='container'>
				<img src='' alt='' className='navbar__logo' />
				<div className='navbar__header'>Disk Cloud</div>
				<div className='navbar__login' onClick={toLoginModal}>
					Login
				</div>
				<div className='navbar__registration' onClick={toRegisterModal}>
					Create account
				</div>
			</div>
		</div>
	);
}

export default Navbar;
