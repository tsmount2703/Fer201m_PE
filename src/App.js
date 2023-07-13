import { useEffect } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Contact from './layouts/Contact';
import Dashboard from './layouts/Dashboard';
import Index from './layouts/Index';

import { Routes, Route } from 'react-router-dom'

import { useDispatch } from "react-redux";
import { setStaff } from './core/redux/staff';
import { get } from './api/RESTAPI';
import Detail from './layouts/Detail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const api = `https://6498feaa79fbe9bcf83e8ac7.mockapi.io/api/v1/staffManagement` // phải sửa api


function App() {

	const dispatch = useDispatch()
	useEffect(() => {
		
		get(api)
			.then(res => res.json())
			.then(data => {
				dispatch(setStaff({ staffs: data }))
			})
	}, [dispatch])

	return (

		<div>
			<Header />

			<Routes>
				<Route path='' element={<Index />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/detail/:id' element={<Detail />} />


			</Routes>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			{/* Same as */}
			<ToastContainer />

			<Footer />
		</div>
	)
}

export default App;
