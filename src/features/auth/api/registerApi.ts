import { api } from "@/shared/api"
import type { RegisterSchema } from "@/shared/lib/types"

export async function register(data: RegisterSchema) {
    const response = await api.auth.register(data)
    return response
}