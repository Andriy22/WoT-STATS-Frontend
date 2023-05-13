export interface IPropsLogin {
    setPassword: (value: string) => void;
    setEmail: (value: string) => void;
    navigate: (to: string) => void;
    isLoading: boolean;
}

export interface IPropsRegister {
    setPassword: (value: string) => void;
    setEmail: (value: string) => void;
    setNickname: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    navigate: (to: string) => void;
}

export interface IAuthData {
    user: IAuthUserData;
    accessToken: string;
    refreshToken: string;
}

export interface IAuthUserData {
    username: string;
    roles: string[];
    id: string;
}

export interface IAuthState {
    access_token: string;
    refresh_token: string;
    user: IAuthUserData;
    isLogged: boolean;
}
