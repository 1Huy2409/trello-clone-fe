import { userApi } from "@/entities/user/api/user-api";
import type { UpdateProfileSchema } from "@/entities/user/model/types";

export async function updateProfileApi(data: UpdateProfileSchema) {
    return await userApi.updateProfile(data)
}