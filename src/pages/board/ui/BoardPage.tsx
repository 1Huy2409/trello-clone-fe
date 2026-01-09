import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { useCommonStore } from "@/shared/stores/commonStore";
import { List } from "@/entities/list/ui/List";
import { ListOptions } from "@/features/list/ui/ListOptions";
import type { List as ListType, Card as CardType } from "@/shared/lib/types";

// Helper interface for local state
interface ListWithCards extends ListType {
    items: CardType[];
}

export default function BoardPage() {
    const { id: boardId } = useParams<{ id: string }>();
    const { lists, cards, boards } = useCommonStore();
    const [boardLists, setBoardLists] = useState<ListWithCards[]>([]);

    // Derived state for board title, etc.
    const board = boards.find(b => b.id === boardId);

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

    if (!board) {
        return <div className="p-8">Board not found</div>;
    }

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b flex items-center justify-between bg-white/50 backdrop-blur-sm">
                <h1 className="text-xl font-bold">{board.title}</h1>
            </div>

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
                                    headerAction={<ListOptions list={list} />}
                                />
                            ))}
                            {provided.placeholder}

                            {/* Add List Placeholder Button */}
                            <div className="w-72 shrink-0 ml-3 first:ml-0">
                                <button className="w-full rounded-xl bg-white/20 hover:bg-white/30 text-left p-3 font-medium text-sm transition-colors flex items-center text-slate-900 border border-slate-200 border-dashed hover:border-solid bg-slate-100">
                                    + Add another list
                                </button>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}