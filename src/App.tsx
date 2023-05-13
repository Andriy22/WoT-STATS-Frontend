import {Navigate, Route, Routes} from 'react-router-dom'
import PrivateRouter from "./utils/router/privateRouter.tsx";
import AuthRootPage from "./components/auth";
import {useEffect} from "react";
import {useAppDispatch} from "./utils/hook";
import {setCredentials} from "./store/slice/auth/authSlice.ts";
import Home from "./components/Home";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const userAuthData = localStorage.getItem('user-auth-data');

        if (userAuthData) {
            dispatch(setCredentials(JSON.parse(userAuthData)))
        }
    }, []);

    return (
        <Routes>
            <Route element={<PrivateRouter/>}>
                <Route index element={<Home/>}/>
            </Route>

            <Route path='auth/login' element={<AuthRootPage/>}/>
            <Route path='auth/registration' element={<AuthRootPage/>}/>
            <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
    )
}

export default App
