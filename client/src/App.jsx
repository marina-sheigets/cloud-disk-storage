import './App.less';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './components/registration/Registration';
import Login from './components/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth } from './selectors';
import { useEffect } from 'react';
import { auth } from './actions/api/user';
import Disk from './components/disk/Disk';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

function App() {
	const dispatch = useDispatch();
	const isAuth = useSelector(getIsAuth);

	useEffect(() => {
		dispatch(auth());
	}, [dispatch]);
	return (
		<BrowserRouter>
			<div className='app'>
				<Navbar />
				<div className='wrap'>
					<Routes>
						{!isAuth ? (
							<>
								<Route path='/login' element={<Login />} />
								<Route path='/registration' element={<Registration />} />
							</>
						) : (
							<Route exact path='/' element={<Disk />} />
						)}
						<Route path='*' element={<NotFoundPage />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
