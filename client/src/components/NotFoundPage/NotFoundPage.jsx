import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../../selectors';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
	const navigate = useNavigate();
	const isAuth = useSelector(getIsAuth);
	useEffect(() => {
		if (isAuth) {
			navigate('/');
		} else {
			navigate('/login');
		}
	}, [isAuth, navigate]);
	return null;
}

export default NotFoundPage;
