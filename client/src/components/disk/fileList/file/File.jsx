import PropTypes from 'prop-types';
import './file.less';
import FolderLogo from '../../../../assets/img/folder.png';
import FileLogo from '../../../../assets/img/file.png';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../actions/creators';
import { getCurrentDir } from '../../../../selectors';
function File({ file }) {
	const dispatch = useDispatch();
	const currentDir = useSelector(getCurrentDir);

	const handleOpenDir = () => {
		if (file.type !== 'dir') return;
		dispatch(pushToStack(currentDir));
		dispatch(setCurrentDir(file._id));
	};
	return (
		<div className='file' onClick={handleOpenDir}>
			<img
				src={file.type === 'dir' ? FolderLogo : FileLogo}
				width={30}
				alt=''
				className='file__img'
			/>
			<div className='file__name'>{file.name}</div>
			<div className='file__date'>{file.date.slice(0, 10)}</div>
			<div className='file__size'>{file.size}</div>
		</div>
	);
}

File.propTypes = {
	file: PropTypes.object,
};
export default File;
