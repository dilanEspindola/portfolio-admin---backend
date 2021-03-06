import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

import '../styles/loginForm.css';

const Login = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
	});
	const { login } = useAuth();

	const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		setData({
			...data,
			[target.name]: target.value,
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login(data.email, data.password);
	};

	return (
		<div className="form-login-container h-screen flex items-center justify-center">
			<div className="form">
				<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
					<h1
						className="text-left text-2xl font-normal
					text-white"
					>
						Login
					</h1>
					<div className="flex flex-col gap-1">
						<label htmlFor="email" className="capitalize text-lg">
							email:
						</label>
						<input
							type="email"
							placeholder="type your email"
							name="email"
							id="email"
							className="border-2 border-gray-300 p-3 rounded-full 
							bg-transparent focus:outline-none focus:rounded-full"
							onChange={handleChange}
							required
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor="pass" className="capitalize text-lg">
							password:
						</label>
						<input
							type="password"
							id="pass"
							placeholder="type your password"
							name="password"
							className="border-2 border-gray-300 p-3 rounded-full 
							bg-transparent focus:outline-none"
							onChange={handleChange}
							required
						/>
					</div>
					<button className="p-3">login</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
