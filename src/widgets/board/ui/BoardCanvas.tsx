import { useEffect, useState, useMemo } from "react";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { useQueries } from "@tanstack/react-query";
import { List } from "@/entities/list/ui/List";
import { ListOptions } from "@/features/list/ui/ListOptions";
import { CreateList } from "@/features/list/ui/CreateList";
import type { List as ListType } from "@/entities/list/model/types";
import type { Card as CardType } from "@/entities/card/model/types";
import { useListsByBoard, useReorderList } from "@/entities/list/api/use-lists";
import { useReorderCard } from "@/entities/card/api/use-cards";
import { cardApi } from "@/entities/card/api/card-api";
import { cardKeys } from "@/entities/card/api/query-keys";

// Helper interface for local state
interface ListWithCards extends ListType {
    items: CardType[];
}

interface BoardCanvasProps {
    boardId: string;
}

export function BoardCanvas({ boardId }: BoardCanvasProps) {
    const { data: lists = [] } = useListsByBoard(boardId);

    // Fetch cards for all lists
    const cardQueries = useQueries({
        queries: lists.map((list) => ({
            queryKey: cardKeys.byList(list.id),
            queryFn: async () => {
                const res = await cardApi.getCardByListId<CardType[]>(list.id);
                return { listId: list.id, cards: res.responseObject };
            },
            enabled: !!list.id,
        })),
    });

    const [boardLists, setBoardLists] = useState<ListWithCards[]>([]);
    const { mutate: reorderList } = useReorderList();
    const { mutate: reorderCard } = useReorderCard();

    const combinedData = useMemo(() => {
        if (!lists) return [];
        return lists
            .map(list => {
                const query = cardQueries.find(q => q.data?.listId === list.id);
                const cards = query?.data?.cards || [];
                return {
                    ...list,
                    items: [...cards].sort((a, b) => parseInt(a.position) - parseInt(b.position))
                };
            })
            .sort((a, b) => parseInt(a.position) - parseInt(b.position));
    }, [lists, cardQueries]);

    useEffect(() => {
        setBoardLists(combinedData);
    }, [JSON.stringify(combinedData)]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Reordering Lists
        if (type === "list") {
            const newLists = [...boardLists];
            const [removed] = newLists.splice(source.index, 1);
            newLists.splice(destination.index, 0, removed);

            setBoardLists(newLists);

            // Calculate Payload
            const beforeList = newLists[destination.index - 1];
            const afterList = newLists[destination.index + 1];

            const payload = {
                listId: removed.id,
                beforeListId: beforeList ? beforeList.id : null,
                afterListId: afterList ? afterList.id : null
            };

            reorderList(payload);
            return;
        }

        // Reordering Cards
        const sourceList = boardLists.find(l => l.id === source.droppableId);
        const destList = boardLists.find(l => l.id === destination.droppableId);

        if (!sourceList || !destList) return;

        // Move within the same list
        if (source.droppableId === destination.droppableId) {
            const newCards = [...sourceList.items];
            const [removed] = newCards.splice(source.index, 1);
            newCards.splice(destination.index, 0, removed);

            const newLists = boardLists.map(l => {
                if (l.id === sourceList.id) {
                    return { ...l, items: newCards };
                }
                return l;
            });

            setBoardLists(newLists);

            // Calculate Payload
            const beforeCard = newCards[destination.index - 1];
            const afterCard = newCards[destination.index + 1];

            const payload = {
                cardId: removed.id,
                targetListId: destList.id,
                beforeCardId: beforeCard ? beforeCard.id : null,
                afterCardId: afterCard ? afterCard.id : null
            };

            reorderCard(payload);

        } else {
            // Move to another list
            const sourceCards = [...sourceList.items];
            const destCards = [...destList.items];
            const [removed] = sourceCards.splice(source.index, 1);

            destCards.splice(destination.index, 0, { ...removed, listId: destList.id });

            const newLists = boardLists.map(l => {
                if (l.id === sourceList.id) {
                    return { ...l, items: sourceCards };
                }
                if (l.id === destList.id) {
                    return { ...l, items: destCards };
                }
                return l;
            });

            setBoardLists(newLists);

            // Calculate Payload
            const beforeCard = destCards[destination.index - 1];
            const afterCard = destCards[destination.index + 1];

            const payload = {
                cardId: removed.id,
                targetListId: destList.id,
                beforeCardId: beforeCard ? beforeCard.id : null,
                afterCardId: afterCard ? afterCard.id : null
            };

            reorderCard(payload);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board-lists" direction="horizontal" type="list">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex-1 overflow-x-auto overflow-y-hidden px-4 pb-4 pt-4 flex items-start"
                    >
                        {boardLists.map((list, index) => (
                            <List
                                key={list.id}
                                list={list}
                                cards={list.items}
                                index={index}
                                headerAction={(props) => <ListOptions list={list} onAddCard={props.onAddCard} />}
                            />
                        ))}
                        {provided.placeholder}
                        <CreateList boardId={boardId} />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
