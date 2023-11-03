import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDir } from '../../selectors';
import { getFiles } from '../../actions/api/file';
import FileList from './fileList/FileList';
import './disk.less';

function Disk() {
	const dispatch = useDispatch();
	const currentDir = useSelector(getCurrentDir);
	useEffect(() => {
		dispatch(getFiles(currentDir));
	}, [currentDir, dispatch]);
	return (
		<div className='disk'>
			<div className='disk__btns'>
				<button className='disk__back'>Back</button>
				<button className='disk__create'>Create folder</button>
			</div>
			<FileList />
		</div>
	);
}

export default Disk;
