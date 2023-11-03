import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDir, getDirStack } from '../../selectors';
import { getFiles, uploadFile } from '../../actions/api/file';
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

	const handleUploadFile = (e) => {
		const files = [...e.target.files];
		console.log(files);
		files.forEach((file) => dispatch(uploadFile(file, currentDir)));
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
				<div className='disk__upload'>
					<label htmlFor='disk__upload-input' className='disk__upload-label'>
						Upload file
					</label>
					<input
						multiple
						onChange={handleUploadFile}
						type='file'
						className='disk__upload-input'
						id='disk__upload-input'
					/>
				</div>
			</div>
			<FileList />
			<Popup />
		</div>
	);
}

export default Disk;
