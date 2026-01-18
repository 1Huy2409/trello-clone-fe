export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    responseObject: T;
    statusCode: number;
}

export interface ApiError {
    name: string;
    message: string;
    statusCode: number;
    code?: string;
}
