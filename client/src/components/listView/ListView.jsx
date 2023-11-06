import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { HiOutlineViewList } from 'react-icons/hi';
import './listView.less';
import { useDispatch, useSelector } from 'react-redux';
import { setViewAction } from '../../actions/creators';
import { getSelectedView } from '../../selectors';

function ListView() {
	const dispatch = useDispatch();
	const selectedView = useSelector(getSelectedView);

	return (
		<div className='list-view'>
			<button
				onClick={() => dispatch(setViewAction('plate'))}
				className={`list-view__plate ${
					selectedView === 'plate' && 'list-view__selected'
				} `}>
				<BsFillGrid3X3GapFill />
			</button>
			<button
				onClick={() => dispatch(setViewAction('list'))}
				className={`list-view__list ${selectedView === 'list' && 'list-view__selected'}`}>
				<HiOutlineViewList />
			</button>
		</div>
	);
}

export default ListView;
