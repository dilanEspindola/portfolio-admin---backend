import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserInfo } from '../interfaces/UserInfo';
import Swal from 'sweetalert2';

interface ContextInterface {
	user: UserInfo;
	login: (email: string, password: string) => void;
	loading: boolean;
}

interface Props {
	children: ReactNode;
}

export const context = createContext<ContextInterface>({} as ContextInterface);

export const useAuth = () => useContext(context);

export const AuthProvider = ({ children }: Props) => {
	const [userInfo, setUserInfo] = useState<UserInfo>();
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const login = (email: string, password: string) => {
		setLoading(true);
		return axios
			.post('http://localhost:4000/api/user/login', {
				email,
				password,
			})
			.then(({ data }) => {
				if (data.auth === false) {
					switch (data.msg) {
						case 'email is not valid':
							Swal.fire({
								icon: 'error',
								title: 'Oops...',
								text: 'Email is not valid :(',
							}).then(() => navigate('/login'));
							break;
						case 'wrong password':
							Swal.fire({
								icon: 'error',
								title: 'Oops...',
								text: 'Wrong password :/',
							}).then(() => navigate('/login'));
							break;
					}
				} else {
					setUserInfo(data);
					setLoading(false);
					localStorage.setItem('token', JSON.stringify(data.token));
					navigate('/');
				}
			})
			.catch(error => console.log(error));
	};

	return (
		<context.Provider value={{ user: userInfo!, login, loading }}>
			{children}
		</context.Provider>
	);
};
