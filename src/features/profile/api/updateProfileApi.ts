import { api } from "@/shared/api";
import type { UpdateProfileSchema } from "@/shared/lib/types";

export async function updateProfileApi(data: UpdateProfileSchema) {
    return await api.user.updateProfile(data)
}