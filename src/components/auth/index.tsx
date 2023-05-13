import {useLocation, useNavigate} from "react-router-dom";
import "./style.scss"
import {Alert, Avatar, Box, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Login from "./login";
import React, {useState} from "react";
import Register from "./register";
import {useLoginMutation} from "../../store/slice/auth/authApiSlice.ts";
import {IErrorResponse} from "../../common/types/errors";
import {useAppDispatch} from "../../utils/hook";
import {setCredentials} from "../../store/slice/auth/authSlice.ts";

const Heading = (props: { path: string }) => {
    const {path} = props

    return (<Typography component="h1" variant="h5">
        {path === "/auth/login" ? "Sign In" : "Sign Up"}
    </Typography>)
}
const AuthRootPage: React.FC = (): JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const [login, {isLoading}] = useLoginMutation();

    const dispatch = useAppDispatch();

    const handleLogin = async () => {
        try {
            const data = await login({email, password}).unwrap();

            setErrorMsg('');
            setEmail('');
            setPassword('');

            dispatch(setCredentials(data));

            navigate('/');
        } catch (err) {
            const error = err as IErrorResponse;
            if (error?.data?.error) {
                setErrorMsg(error?.data?.error)
            }
        }
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (location.pathname === '/auth/login') {
            await handleLogin();
            return;
        }

        if (location.pathname === '/auth/registration') {
            if (password !== confirmPassword) {
                throw new Error("passwords must be same!");
            }

            console.log(email, password);
            console.log(nickname, confirmPassword);
            return;
        }
    }

    return (
        <div className='layout'>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                margin='auto'
                maxWidth={640}
                padding={5}
                borderRadius={5}
                boxShadow={'5px 5px 10px #ccc'}
            >
                <Avatar sx={{m: 1}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Heading path={location.pathname}></Heading>

                {errorMsg ?
                    <Alert severity="error" sx={{width: '100%'}}>{errorMsg}</Alert> : null}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    {location.pathname === '/auth/login' ? (
                            <Login setEmail={setEmail}
                                   setPassword={setPassword}
                                   isLoading={isLoading}
                                   navigate={navigate}/>
                        )
                        : location.pathname === '/auth/registration' ? (
                            <Register setEmail={setEmail}
                                      setPassword={setPassword}
                                      setNickname={setNickname}
                                      setConfirmPassword={setConfirmPassword}
                                      navigate={navigate}/>
                        ) : null}
                </Box>
            </Box>

        </div>
    );
};

export default AuthRootPage;
