import { useState, useRef, type ElementRef } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "@/entities/card/ui/Card";
import type { List as ListType } from "@/entities/list";
import type { Card as CardType } from "@/entities/card";
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useCreateCard } from "@/entities/card/api/use-cards";
import { useUpdateList } from "../api/use-lists";

interface ListProps {
    list: ListType;
    cards: CardType[];
    index: number;
    headerAction?: React.ReactNode | ((props: { onAddCard: () => void }) => React.ReactNode);
}

export const List = ({ list, cards, index, headerAction }: ListProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isRenaming, setIsRenaming] = useState(false);
    const textareaRef = useRef<ElementRef<"textarea">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);
    const { mutate: createCard } = useCreateCard();
    const { mutate: updateList } = useUpdateList();

    const enableRenaming = () => {
        setIsRenaming(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    };

    const disableRenaming = () => {
        setIsRenaming(false);
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        const title = inputRef.current?.value;
        if (!title || title === list.title) {
            disableRenaming();
            return;
        }

        updateList({
            listId: list.id,
            data: { title }
        });
        disableRenaming();
    };

    const onRenamingKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            disableRenaming();
        }
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

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
                        {isRenaming ? (
                            <input
                                ref={inputRef}
                                defaultValue={list.title}
                                onBlur={() => handleSubmit()}
                                onKeyDown={onRenamingKeyDown}
                                className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-background rounded-sm"
                            />
                        ) : (
                            <div
                                onClick={enableRenaming}
                                className="truncate px-1 font-medium text-sm cursor-pointer hover:bg-gray-200/50 rounded-sm py-1"
                            >
                                {list.title}
                            </div>
                        )}
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
                                    <Button onClick={() => {
                                        if (textareaRef.current?.value) {
                                            createCard({
                                                listId: list.id,
                                                data: {
                                                    title: textareaRef.current.value,
                                                    description: "",
                                                    // coverUrl: "", 
                                                    // priority: "low", 
                                                    // dueDate: new Date().toISOString() 
                                                    // server might require these or have defaults. 
                                                    // Based on api.shared.ts it accepts 'any' but type.ts says CreateCard has required fields?
                                                    // Let's check type.ts CreateCard again.
                                                }
                                            });
                                            textareaRef.current.value = "";
                                            // Keep open?
                                            textareaRef.current.focus();
                                        }
                                    }} variant="default" size="sm">
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
