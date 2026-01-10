import { useState, useRef, type ElementRef } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "@/entities/card/ui/Card";
import type { List as ListType, Card as CardType } from "@/shared/lib/types";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface ListProps {
    list: ListType;
    cards: CardType[];
    index: number;
    headerAction?: React.ReactNode | ((props: { onAddCard: () => void }) => React.ReactNode);
}

export const List = ({ list, cards, index, headerAction }: ListProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const textareaRef = useRef<ElementRef<"textarea">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };

    return (
        <Draggable draggableId={list.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`w-72 shrink-0 max-h-full flex flex-col rounded-xl bg-gray-100/50 border border-gray-200 ml-3 first:ml-0 ${snapshot.isDragging ? "opacity-50" : ""
                        }`}
                >
                    {/* List Header */}
                    <div
                        {...provided.dragHandleProps}
                        className="p-3 flex items-center justify-between font-medium text-sm"
                    >
                        <div className="truncate px-1">{list.title}</div>
                        {typeof headerAction === "function"
                            ? headerAction({ onAddCard: enableEditing })
                            : headerAction}
                    </div>

                    {/* List Content (Droppable Area) */}
                    <Droppable droppableId={list.id} type="card">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`flex-1 overflow-y-auto px-2 min-h-[20px] transition-colors ${snapshot.isDraggingOver ? "bg-gray-200/50 rounded-lg" : ""
                                    }`}
                            >
                                {cards.map((card, index) => (
                                    <Card key={card.id} card={card} index={index} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    {/* List Footer */}
                    <div className="p-2">
                        {isEditing ? (
                            <div className="px-1 py-1">
                                <textarea
                                    ref={textareaRef}
                                    onKeyDown={onKeyDown}
                                    placeholder="Enter card title..."
                                    className="w-full resize-none shadow-sm rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
                                />
                                <div className="flex items-center gap-x-2 mt-2">
                                    <Button onClick={() => alert("Add Card")} variant="default" size="sm">
                                        Add Card
                                    </Button>
                                    <Button onClick={disableEditing} variant="ghost" size="sm">
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Button
                                onClick={enableEditing}
                                variant="ghost"
                                className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-gray-200/50"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add a card
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
};
