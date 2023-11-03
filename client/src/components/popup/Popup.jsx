import './popup.less';
import Input from '../input/Input.jsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDir, getPopupDisplay } from '../../selectors';
import { setPopupDisplay } from '../../actions/creators';
import { createDir } from '../../actions/api/file';

function Popup() {
	const dispatch = useDispatch();
	const currentDir = useSelector(getCurrentDir);
	const popupDisplay = useSelector(getPopupDisplay);
	const [dirName, setDirName] = useState('');

	const handleClose = () => {
		dispatch(setPopupDisplay('none'));
		setDirName('');
	};
	const handleCreateFolder = () => {
		dispatch(createDir(currentDir, dirName));
		handleClose();
	};

	const handleChangeDirName = (e) => {
		setDirName(e.target.value);
	};
	return (
		<div className='popup' style={{ display: popupDisplay }} onClick={handleClose}>
			<div className='popup__content' onClick={(e) => e.stopPropagation()}>
				<div className='popup__header'>
					<div className='popup__title'>Create New Folder</div>
					<button className='popup__close' onClick={handleClose}>
						X
					</button>
				</div>
				<Input
					value={dirName}
					onChange={handleChangeDirName}
					type='text'
					placeholder={'Enter the name of folder'}
				/>
				<button className='popup__create' onClick={handleCreateFolder}>
					Create
				</button>
			</div>
		</div>
	);
}

export default Popup;
