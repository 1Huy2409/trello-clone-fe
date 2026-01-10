import { api } from "@/shared/api";
import type { VerifyOTPSchema } from "@/shared/lib/types";

export async function verifyOTP(data: VerifyOTPSchema) {
    const response = await api.auth.verifyOTP(data);
    return response;
}
