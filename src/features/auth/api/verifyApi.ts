import { authApi } from "./auth-api";
import type { VerifyOTPSchema } from "../model/types";

export async function verifyOTP(data: VerifyOTPSchema) {
    const response = await authApi.verifyOTP(data);
    return response;
}
