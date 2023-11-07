import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDir, getDirStack, getIsAuth, getLoader } from '../../selectors';
import { getFiles, searchFiles, uploadFile } from '../../actions/api/file';
import FileList from './fileList/FileList';
import './disk.less';
import Popup from '../popup/Popup';
import { emptyStack, setCurrentDir, setPopupDisplay } from '../../actions/creators';
import UploadModal from '../uploader/UploadModal';
import Loader from '../loader/Loader';
import ListView from '../listView/ListView';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebouce';

const OPTIONS = [
	{ id: 4, value: 'name', label: 'By name' },
	{ id: 1, value: 'date', label: 'By date' },
	{ id: 2, value: 'type', label: 'By type' },
	{ id: 3, value: 'size', label: 'By size' },
];
function Disk() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loader = useSelector(getLoader);
	const currentDir = useSelector(getCurrentDir);
	const dirStack = useSelector(getDirStack);
	const isAuth = useSelector(getIsAuth);

	const [sort, setSort] = useState('type');
	const [dragEnter, setDragEnter] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const debouncedValue = useDebounce(searchQuery, 750);
	const handleCreateFile = () => {
		dispatch(setPopupDisplay('flex'));
	};
	useEffect(() => {
		dispatch(getFiles(currentDir, sort));
	}, [currentDir, dispatch, sort]);

	useEffect(() => {
		if (!isAuth) {
			navigate('/login');
		}
	}, [isAuth, navigate]);

	const handleChangeSearchQuery = (e) => {
		setSearchQuery(e.target.value);
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

	useEffect(() => {
		dispatch(setCurrentDir(null));
		dispatch(emptyStack());
	}, [dispatch]);

	useEffect(() => {
		if (debouncedValue) {
			dispatch(searchFiles(debouncedValue));
		} else {
			dispatch(getFiles(currentDir, sort));
		}
	}, [currentDir, debouncedValue, dispatch, sort]);

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
				<button
					className='disk__back'
					disabled={dirStack.length === 0}
					onClick={handleBack}>
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
