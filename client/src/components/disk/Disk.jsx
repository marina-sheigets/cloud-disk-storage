import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDir, getDirStack, getLoader } from '../../selectors';
import { getFiles, searchFiles, uploadFile } from '../../actions/api/file';
import FileList from './fileList/FileList';
import './disk.less';
import Popup from '../popup/Popup';
import { setCurrentDir, setPopupDisplay } from '../../actions/creators';
import UploadModal from '../uploader/UploadModal';
import Loader from '../loader/Loader';
import ListView from '../listView/ListView';

const OPTIONS = [
	{ id: 4, value: 'name', label: 'By name' },
	{ id: 1, value: 'date', label: 'By date' },
	{ id: 2, value: 'type', label: 'By type' },
	{ id: 3, value: 'size', label: 'By size' },
];
function Disk() {
	const dispatch = useDispatch();
	const loader = useSelector(getLoader);
	const currentDir = useSelector(getCurrentDir);
	const dirStack = useSelector(getDirStack);

	const [sort, setSort] = useState('type');
	const [dragEnter, setDragEnter] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchTimeout, setSearchTimeout] = useState(false);
	const handleCreateFile = () => {
		dispatch(setPopupDisplay('flex'));
	};
	useEffect(() => {
		dispatch(getFiles(currentDir, sort));
	}, [currentDir, dispatch, sort]);

	const handleChangeSearchQuery = (e) => {
		setSearchQuery(e.target.value);
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}
		if (e.target.value) {
			setSearchTimeout(
				setTimeout(() => {
					dispatch(searchFiles(searchQuery));
				}, 500)
			);
		} else {
			dispatch(getFiles(currentDir, sort));
		}
	};
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

	const handleChangeSort = (e) => {
		setSort(e.target.value);
	};

	if (loader) {
		return <Loader />;
	}
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
				<select value={sort} onChange={handleChangeSort} className='disk__select'>
					{OPTIONS.map((option) => (
						<option key={option.id} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<ListView />
				<input
					type='text'
					value={searchQuery}
					onChange={handleChangeSearchQuery}
					placeholder='Search'
					className='disk__search'
				/>
			</div>
			<FileList />
			<Popup />
			<UploadModal />
		</div>
	);
}

export default Disk;
