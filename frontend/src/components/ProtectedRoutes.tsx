import { Navigate } from 'react-router-dom';

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const ProtectedRoutes = ({ children }: Props) => {
	if (localStorage.getItem('token') === null) return <Navigate to="/login" />;

	return <div>{children}</div>;
};
