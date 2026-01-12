export const boardKeys = {
    all: ['boards'] as const,
    lists: () => [...boardKeys.all, 'list'] as const,
    byWorkspace: (workspaceId: string) => [...boardKeys.all, 'workspace', workspaceId] as const,
    detail: (id: string) => [...boardKeys.all, 'detail', id] as const,
};
