import type { User } from "../lib/types";

// interface CommonStore {
//     token: string | null;
//     currentUser: User | null;
//     setToken: (token: string | null) => void;
//     setCurrentUser: (user: User | null) => void;
// }

export const mockUser: User = {
    id: '1',
    fullname: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    googleId: 'googleID123',
    avatarUrl: 'https://avatarurl.com',
    description: 'Short bio or about me',
    isActive: true,
}
// export const useCommonStore = create<CommonStore>((set, get) => ({
//     token: null,
//     currentUser: null,
//     setToken: (token: string | null) => set({ token }),
//     setCurrentUser: (user: User | null) => set({ currentUser: user }),
//     currentUser: mockUser,
// })
// );
