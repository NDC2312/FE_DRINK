import { useEffect } from 'react';
import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children, permission }) {
    const { permissions } = useSelector((state) => state.permissionReducer);
    const navigate = useNavigate();
    const token = cookie.load('token');
    useEffect(() => {
        if (!token) {
            navigate(config.routes.admin);
        } else if (permission && !permissions.includes(permission)) {
            navigate('/403');
        }
    }, [token, navigate, permission, permissions]);
    return token ? children : null;
}

export default ProtectedRoute;
