export const listKeys = {
    all: ['lists'] as const,
    byBoard: (boardId: string) => [...listKeys.all, 'board', boardId] as const,
    detail: (id: string) => [...listKeys.all, 'detail', id] as const,
};
