import { useDispatch } from 'react-redux';
import { deleteAvatar, uploadAvatar } from '../../actions/api/user';
import './profile.less';
import PropTypes from 'prop-types';
function Profile({ handleAvatarClose }) {
	const dispatch = useDispatch();

	const handleDeleteAvatar = () => {
		dispatch(deleteAvatar());
		handleAvatarClose();
	};

	const handleChangeAvatar = (e) => {
		console.log(e);
		const file = e.target.files[0];
		dispatch(uploadAvatar(file));
		handleAvatarClose();
	};
	return (
		<div className='profile' onClick={handleAvatarClose}>
			<div
				className='profile__wrapper'
				onClick={(e) => {
					e.stopPropagation();
				}}>
				<button onClick={handleDeleteAvatar}>Delete avatar</button>
				or
				<label htmlFor='avatar-input' className='profile__label'>
					Select avatar
				</label>
				<input
					id='avatar-input'
					className='profile__input'
					accept='image/*'
					onChange={handleChangeAvatar}
					type='file'
					style={{ display: 'none' }}
					placeholder='Download avatar'
				/>
			</div>
		</div>
	);
}

Profile.propTypes = {
	handleAvatarClose: PropTypes.func,
};
export default Profile;
