import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDir, getDirStack } from '../../selectors';
import { getFiles, uploadFile } from '../../actions/api/file';
import FileList from './fileList/FileList';
import './disk.less';
import Popup from '../popup/Popup';
import { setCurrentDir, setPopupDisplay } from '../../actions/creators';
import UploadModal from '../uploader/UploadModal';

function Disk() {
	const dispatch = useDispatch();
	const currentDir = useSelector(getCurrentDir);
	const dirStack = useSelector(getDirStack);

	const [dragEnter, setDragEnter] = useState(false);
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
		files.forEach((file) => dispatch(uploadFile(file, currentDir)));
	};

	const handleDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();

		setDragEnter(true);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};
	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();

		setDragEnter(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();

		let files = [...e.dataTransfer.files];

		setDragEnter(false);
		files.forEach((file) => dispatch(uploadFile(file, currentDir)));
	};
	return dragEnter ? (
		<div
			className='drop-area'
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}>
			Drag files here
		</div>
	) : (
		<div
			className='disk'
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}>
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
			<UploadModal/>
		</div>
	);
}

export default Disk;
