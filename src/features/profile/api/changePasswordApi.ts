import { api } from "@/shared/api";
import type { ChangePasswordSchema } from "@/shared/lib/types";

export async function changePasswordApi(data: ChangePasswordSchema) {
    return await api.auth.changePassword(data)
}