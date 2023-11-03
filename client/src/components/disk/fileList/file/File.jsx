import PropTypes from 'prop-types';
import './file.less';
import FolderLogo from '../../../../assets/img/folder.png';
import FileLogo from '../../../../assets/img/file.png';

function File({ file }) {
	return (
		<div className='file'>
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
