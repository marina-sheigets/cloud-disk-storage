import { useNavigate } from 'react-router-dom';
import './navbar.less';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, getIsAuth } from '../../selectors';
import { logOut } from '../../actions/creators';
import UnknownAvatar from '../../assets/img/unknown_avatar.png';
import { API_URL } from '../../config';
import { useMemo, useState } from 'react';
import Profile from '../profile/Profile';

function Navbar() {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const currentUser = useSelector(getCurrentUser);
	const isAuth = useSelector(getIsAuth);
	const avatar = useMemo(
		() => (currentUser.avatar ? `${API_URL + currentUser.avatar}` : UnknownAvatar),
		[currentUser.avatar]
	);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const toLoginModal = () => {
		navigate('/login');
	};

	const toRegisterModal = () => {
		navigate('/registration');
	};

	const logout = () => {
		dispatch(logOut());
	};

	const handleAvatarClick = () => {
		setIsProfileOpen(true);
	};

	const handleAvatarClose = () => {
		setIsProfileOpen(false);
	};
	return (
		<div className='navbar'>
			<div className='container'>
				<img src='' alt='' className='navbar__logo' />
				<div className='navbar__header'>Disk Cloud</div>
				{isAuth ? (
					<>
						<div className='navbar__login' onClick={logout}>
							Logout
						</div>

						<img onClick={handleAvatarClick} className='navbar__avatar' src={avatar} />

						{isProfileOpen && <Profile handleAvatarClose={handleAvatarClose} />}
					</>
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
