export const cardKeys = {
    all: ['cards'] as const,
    byList: (listId: string) => [...cardKeys.all, 'list', listId] as const,
    detail: (id: string) => [...cardKeys.all, 'detail', id] as const,
};
