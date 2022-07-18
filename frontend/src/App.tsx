import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import { ProtectedRoutes } from './components/ProtectedRoutes';

import { AuthProvider } from './auth/AuthContext';

const App = () => {
	return (
		<>
			<AuthProvider>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route
						path="/"
						element={
							<ProtectedRoutes>
								<Home />
							</ProtectedRoutes>
						}
					/>
				</Routes>
			</AuthProvider>
		</>
	);
};

export default App;
