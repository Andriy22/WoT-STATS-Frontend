export interface IErrorResponse {
    status: number;
    data: IErrorDataResponse;
}

export interface IErrorDataResponse {
    code: number;
    error: string;
    details?: string;
}
