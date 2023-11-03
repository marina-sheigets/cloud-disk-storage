import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDir, getDirStack } from '../../selectors';
import { getFiles } from '../../actions/api/file';
import FileList from './fileList/FileList';
import './disk.less';
import Popup from '../popup/Popup';
import { setCurrentDir, setPopupDisplay } from '../../actions/creators';

function Disk() {
	const dispatch = useDispatch();
	const currentDir = useSelector(getCurrentDir);
	const dirStack = useSelector(getDirStack);
	const handleCreateFile = () => {
		dispatch(setPopupDisplay('flex'));
	};
	useEffect(() => {
		dispatch(getFiles(currentDir));
	}, [currentDir, dispatch]);

	const handleBack = () => {
		const backDirId = dirStack.pop();
		dispatch(setCurrentDir(backDirId));
	};
	return (
		<div className='disk'>
			<div className='disk__btns'>
				<button className='disk__back' onClick={handleBack}>
					Back
				</button>
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
