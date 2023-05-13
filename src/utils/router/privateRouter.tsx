import {Navigate, Outlet} from 'react-router-dom'
import {useAuth} from "../hook";

const PrivateRouter = () => {
    const auth = useAuth();

    console.log(auth);

    return (
        auth ? <Outlet/> : <Navigate to="auth/login"/>
    );
};

export default PrivateRouter;
