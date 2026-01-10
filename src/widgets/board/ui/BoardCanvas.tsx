import { useEffect, useState } from "react";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { useCommonStore } from "@/shared/stores/commonStore";
import { List } from "@/entities/list/ui/List";
import { ListOptions } from "@/features/list/ui/ListOptions";
import { CreateList } from "@/features/list/ui/CreateList";
import type { List as ListType, Card as CardType } from "@/shared/lib/types";

// Helper interface for local state
interface ListWithCards extends ListType {
    items: CardType[];
}

interface BoardCanvasProps {
    boardId: string;
}

export function BoardCanvas({ boardId }: BoardCanvasProps) {
    const { lists, cards } = useCommonStore();
    const [boardLists, setBoardLists] = useState<ListWithCards[]>([]);

    // Initialize local state from store
    useEffect(() => {
        if (!boardId) return;

        const currentLists = lists
            .filter((l) => l.boardId === boardId)
            .sort((a, b) => parseInt(a.position) - parseInt(b.position));

        const listsWithCards: ListWithCards[] = currentLists.map((list) => {
            const listCards = cards
                .filter((c) => c.listId === list.id)
                .sort((a, b) => parseInt(a.position) - parseInt(b.position));
            return { ...list, items: listCards };
        });

        setBoardLists(listsWithCards);
    }, [boardId, lists, cards]);

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

            console.log("List Reorder Payload:", {
                listId: removed.id,
                beforeListId: beforeList ? beforeList.id : null,
                afterListId: afterList ? afterList.id : null
            });
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

            console.log("Card Reorder Payload (Same List):", {
                cardId: removed.id,
                targetListId: destList.id,
                beforeCardId: beforeCard ? beforeCard.id : null,
                afterCardId: afterCard ? afterCard.id : null
            });

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

            console.log("Card Reorder Payload (Cross List):", {
                cardId: removed.id,
                targetListId: destList.id,
                beforeCardId: beforeCard ? beforeCard.id : null,
                afterCardId: afterCard ? afterCard.id : null
            });
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board-lists" direction="horizontal" type="list">
                {(provided, snapshot) => (
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

                        {/* Add List Placeholder Button */}
                        <CreateList boardId={boardId} />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
