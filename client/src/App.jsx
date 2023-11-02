import './App.less';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './components/registration/Registration';
import Login from './components/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth } from './selectors';
import { useEffect } from 'react';
import { auth } from './actions/api/user';

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
					{!isAuth && (
						<Routes>
							<Route path='/login' element={<Login />} />

							<Route path='/registration' element={<Registration />} />
						</Routes>
					)}
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
