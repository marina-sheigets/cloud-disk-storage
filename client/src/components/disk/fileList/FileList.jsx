import { useSelector } from 'react-redux';
import './filelist.less';
import { getFiles, getSelectedView } from '../../../selectors';
import File from './file/File';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function FileList() {
	const files = useSelector(getFiles);
	const selectedView = useSelector(getSelectedView);

	if (!files.length) {
		return <div className='filelist'>There are no files</div>;
	}

	if (selectedView === 'list') {
		return (
			<div className='filelist'>
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
			</div>
		);
	}

	return (
		<div className='filelist-plate'>
			{files.map((file) => (
				<File file={file} key={file._id} />
			))}
		</div>
	);
}

export default FileList;
