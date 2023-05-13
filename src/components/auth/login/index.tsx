import {Grid, Link, TextField} from "@mui/material";
import {IPropsLogin} from "../../../common/types/auth";
import React from "react";
import {LoadingButton} from "@mui/lab";

const Login: React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element => {
    const {setEmail, setPassword} = props;

    const {navigate} = props;

    const {isLoading} = props;

    return (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(event) => {
                    setEmail(event.target.value)
                }}
                autoComplete="email"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={(event) => {
                    setPassword(event.target.value)
                }}
                id="password"
                autoComplete="current-password"
            />

            <LoadingButton
                type="submit"
                fullWidth
                loading={isLoading}
                variant="contained"

                sx={{mt: 3, mb: 2}}
            >
                Sign In
            </LoadingButton>

            <Grid container>
                <Grid item>
                    <Link component='button' variant="body2" onClick={() => navigate('/auth/registration')}>
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </>
    );
};

export default Login;
