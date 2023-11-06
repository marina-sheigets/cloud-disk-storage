import { getIsVisible, getUploadFiles } from '../../selectors';
import Uploader from './Uploader';
import { useDispatch, useSelector } from 'react-redux';

import './uploader.less';
import { hideUploaderAction } from '../../actions/creators';
function UploadModal() {
	const dispatch = useDispatch();
	const isVisible = useSelector(getIsVisible);
	const files = useSelector(getUploadFiles);

	const handleCloseUploaderModal = () => {
		dispatch(hideUploaderAction());
	};

	return (
		isVisible && (
			<div className='uploader'>
				<div className='uploader__header'>
					<div className='uploader__title'>Downloads</div>
					<button className='uploader__close' onClick={handleCloseUploaderModal}>
						X
					</button>
				</div>
				{files.map((file) => (
					<Uploader key={file.id} file={file} />
				))}
			</div>
		)
	);
}

export default UploadModal;
