import PropTypes from 'prop-types';
import './file.less';
import FolderLogo from '../../../../assets/img/folder.png';
import FileLogo from '../../../../assets/img/file.png';
import GifLogo from '../../../../assets/img/gif.png';
import ImgLogo from '../../../../assets/img/img.png';
import Mp4Logo from '../../../../assets/img/mp4.png';
import PdfLogo from '../../../../assets/img/pdf.png';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../actions/creators';
import { getCurrentDir } from '../../../../selectors';
import { downloadFile } from '../../../../actions/api/file';
function File({ file }) {
	const FileTypeLogo = {
		dir: FolderLogo,
		txt: FileLogo,
		jpg: ImgLogo,
		jpeg: ImgLogo,
		png: ImgLogo,
		svg: ImgLogo,
		mp4: Mp4Logo,
		pdf: PdfLogo,
		gif: GifLogo,
	};
	const dispatch = useDispatch();
	const currentDir = useSelector(getCurrentDir);

	const handleOpenDir = () => {
		if (file.type !== 'dir') return;
		dispatch(pushToStack(currentDir));
		dispatch(setCurrentDir(file._id));
	};

	const handleDownloadFile = (e) => {
		e.stopPropagation();
		downloadFile(file);
	};

	return (
		<div className='file' onClick={handleOpenDir}>
			<img
				src={FileTypeLogo[file.type] || FileLogo}
				width={30}
				alt=''
				className='file__img'
			/>
			<div className='file__name'>{file.name}</div>
			<div className='file__date'>{file.date.slice(0, 10)}</div>
			<div className='file__size'>{file.size}</div>
			{file.type !== 'dir' && (
				<button onClick={handleDownloadFile} className='file__btn file__download'>
					Download
				</button>
			)}
			<button className='file__btn file__delete'>Delete</button>
		</div>
	);
}

File.propTypes = {
	file: PropTypes.object,
};
export default File;
