import { useSelector } from 'react-redux';
import './filelist.less';
import { getFiles } from '../../../selectors';
import File from './file/File';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function FileList() {
	const files = useSelector(getFiles);

	return (
		<div className='filelist'>
			{files.length ? (
				<>
					<div className='filelist__header'>
						<div className='filelist__name'>Name</div>
						<div className='filelist__date'>Date</div>
						<div className='filelist__size'>Size</div>
					</div>
					<TransitionGroup>
						{files.map((file) => (
							<CSSTransition key={file._id} timeout={500} classNames={'file'}>
								<File file={file} />
							</CSSTransition>
						))}
					</TransitionGroup>
				</>
			) : (
				<>There are no files</>
			)}
		</div>
	);
}

export default FileList;
