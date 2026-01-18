export interface LoginSchema {
    username: string;
    password: string;
}
export interface RegisterSchema {
    fullname: string;
    username: string;
    email: string;
    password: string;
}
export interface VerifyOTPSchema {
    email: string;
    otp: string;
}
