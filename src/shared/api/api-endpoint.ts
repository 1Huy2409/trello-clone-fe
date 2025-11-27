export const API_ENDPOINT = {
    auth: {
        login: '/auth/login',
        requestOTP: '/auth/request-otp',
        verifyOTP: '/auth/verify-otp',
        register: '/auth/register',
        refreshToken: '/auth/processNewToken',
        logout: '/auth/logout',
    },
    workspace: {
        getAllWorkspaces: '/workspaces',
        getWorkspaceById: '/workspaces/:id',
        createWorkspace: '/workspaces',
        updateWorkspace: '/workspaces/:id',
        deleteWorkspace: '/workspaces/:id',
    },
    board: {
        getBoardsByWorkspaceId: '/workspaces/:workspaceId/boards',
    }
} as const;