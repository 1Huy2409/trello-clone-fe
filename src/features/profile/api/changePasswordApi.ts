import { authApi } from "@/features/auth/api/auth-api";
import type { ChangePasswordSchema } from "@/entities/user/model/types";

export async function changePasswordApi(data: ChangePasswordSchema) {
    return await authApi.changePassword(data)
}