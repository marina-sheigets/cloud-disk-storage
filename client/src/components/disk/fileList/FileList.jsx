import { useSelector } from 'react-redux';
import './filelist.less';
import { getFiles } from '../../../selectors';
import File from './file/File';

function FileList() {
	const files = useSelector(getFiles).map((file) => <File key={file._id} file={file} />);

	return (
		<div className='filelist'>
			{files.length ? (
				<>
					<div className='filelist__header'>
						<div className='filelist__name'>Name</div>
						<div className='filelist__date'>Date</div>
						<div className='filelist__size'>Size</div>
					</div>
					{files}
				</>
			) : (
				<>There are no folders</>
			)}
		</div>
	);
}

export default FileList;
