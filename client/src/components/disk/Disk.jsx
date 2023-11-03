import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDir } from '../../selectors';
import { getFiles } from '../../actions/api/file';
import FileList from './fileList/FileList';
import './disk.less';
import Popup from '../popup/Popup';
import { setPopupDisplay } from '../../actions/creators';

function Disk() {
	const dispatch = useDispatch();
	const currentDir = useSelector(getCurrentDir);

	const handleCreateFile = () => {
		dispatch(setPopupDisplay('flex'));
	};
	useEffect(() => {
		dispatch(getFiles(currentDir));
	}, [currentDir, dispatch]);

	return (
		<div className='disk'>
			<div className='disk__btns'>
				<button className='disk__back'>Back</button>
				<button className='disk__create' onClick={handleCreateFile}>
					Create folder
				</button>
			</div>
			<FileList />
			<Popup />
		</div>
	);
}

export default Disk;
