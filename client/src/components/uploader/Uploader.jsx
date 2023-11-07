import PropTypes from 'prop-types';
import './uploader.less';
import { useDispatch } from 'react-redux';
import { truncateFileName } from '../../utils/truncateFileName';
import { removeUploadFileAction } from '../../actions/creators';
function Uploader({ file }) {
	const dispatch = useDispatch();

	const handleClickDelete = () => {
		dispatch(removeUploadFileAction(file.id));
	};

	return (
		<div className='upload-file'>
			<div className='upload-file__header'>
				<div className='upload-file__name' title={file.name}>
					{truncateFileName(file.name, 20)}
				</div>
				<button className='upload-file__remove' onClick={handleClickDelete}>
					X
				</button>
			</div>
			<div className='upload-file__progress-bar'>
				<div
					className='upload-file__upload-bar'
					style={{ width: file.progress + '%' }}></div>
				<div className='upload-file__percent'>{file.progress}%</div>
			</div>
		</div>
	);
}

Uploader.propTypes = {
	file: PropTypes.object,
};
export default Uploader;
