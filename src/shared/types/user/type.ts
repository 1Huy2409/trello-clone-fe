export interface User {
    id: string;
    email: string;
    fullname: string;
    username: string;
    avatarUrl: string;
    description: string;
    isActive: boolean;
}

export interface UpdateProfileSchema {
    fullname?: string;
    username?: string;
    avatarUrl?: string;
    description?: string;
}
