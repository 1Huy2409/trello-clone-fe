import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, X, RotateCcw } from "lucide-react";
import { useArchivedLists, useReopenList, useListsByBoard } from "@/entities/list/api/use-lists";
import { useArchivedCards, useReopenCard } from "@/entities/card/api/use-cards";
import { useQueries } from "@tanstack/react-query";
import { cardKeys } from "@/entities/card/api/query-keys";
import { api } from "@/shared/api";
import type { Card } from "@/shared/lib/types";
import { toast } from "sonner";
import { Input } from "@/shared/components/ui/input";

interface ArchivedItemsProps {
    boardId: string;
    onBack: () => void;
    onClose: () => void;
}

export const ArchivedItems = ({ boardId, onBack, onClose }: ArchivedItemsProps) => {
    const [type, setType] = useState<"cards" | "lists">("cards");

    // Fetch Archived Lists
    const { data: archivedLists } = useArchivedLists(boardId);
    const { mutate: reopenList, isPending: isReopeningList } = useReopenList();

    // For Cards: we fetch all lists, then query archived cards for each
    const { data: lists = [] } = useListsByBoard(boardId);

    // Create queries for all lists
    const cardQueries = useQueries({
        queries: lists.map(list => ({
            queryKey: [...cardKeys.byList(list.id), 'archived'],
            queryFn: async () => {
                const response = await api.card.getArchiveCards<Card[]>(list.id);
                return response.responseObject.map(c => ({ ...c, listName: list.title })); // attach list name for display
            },
            enabled: type === "cards", // only fetch when in cards view
        }))
    });

    const archivedCards = type === "cards"
        ? cardQueries.flatMap(q => q.data || [])
        : [];

    const isLoadingCards = type === "cards" && cardQueries.some(q => q.isLoading);

    const { mutate: reopenCard, isPending: isReopeningCard } = useReopenCard();

    const handleReopenCard = (id: string, name: string) => {
        reopenCard(id, {
            onSuccess: () => toast.success(`Card "${name}" sent to board`)
        });
    };

    const displayItems = type === "lists" ? archivedLists : archivedCards;


    const handleReopenList = (id: string, name: string) => {
        reopenList(id, {
            onSuccess: () => toast.success(`List "${name}" sent to board`)
        });
    };

    return (
        <div className="flex flex-col h-full max-h-[500px]">
            <div className="flex items-center justify-between mb-2 relative py-1 border-b pb-2 flex-shrink-0">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute left-0"
                    onClick={onBack}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-semibold w-full text-center">
                    Archive
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute right-0"
                    onClick={onClose}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex gap-2 p-2 bg-muted/30 rounded-md mb-2 flex-shrink-0">
                {/* Search bar could go here */}
                <Input placeholder="Search archive..." className="h-8" />
            </div>

            <div className="flex gap-2 px-2 mb-2 flex-shrink-0">
                <Button
                    variant={type === "cards" ? "secondary" : "ghost"}
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setType("cards")}
                >
                    Switch to cards
                </Button>
                <Button
                    variant={type === "lists" ? "secondary" : "ghost"}
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setType("lists")}
                >
                    Switch to lists
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 space-y-2 min-h-0">
                {type === "lists" && archivedLists?.map(list => (
                    <div key={list.id} className="flex justify-between items-center p-2 border rounded bg-card hover:bg-accent/10 transition">
                        <span className="text-sm font-medium truncate flex-1 mr-2">{list.title}</span>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => handleReopenList(list.id, list.title)}
                            disabled={isReopeningList}
                        >
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Send to board
                        </Button>
                    </div>
                ))}

                {type === "lists" && (!archivedLists || archivedLists.length === 0) && (
                    <div className="text-center p-4 text-xs text-muted-foreground bg-muted/20 rounded">
                        No archived lists found.
                    </div>
                )}

                {type === "cards" && isLoadingCards && (
                    <div className="text-center p-4 text-xs text-muted-foreground">Loading cards...</div>
                )}

                {type === "cards" && !isLoadingCards && archivedCards.map((card: any) => (
                    <div key={card.id} className="flex flex-col p-2 border rounded bg-card hover:bg-accent/10 transition gap-1">
                        <div className="flex justify-between items-start">
                            <span className="text-sm font-medium truncate flex-1 mr-2">{card.title}</span>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="h-7 text-xs flex-shrink-0"
                                onClick={() => handleReopenCard(card.id, card.title)}
                                disabled={isReopeningCard}
                            >
                                <RotateCcw className="h-3 w-3 mr-1" />
                                Send to board
                            </Button>
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                            in list <span className="font-medium">{card.listName}</span>
                        </div>
                    </div>
                ))}

                {type === "cards" && !isLoadingCards && (!archivedCards || archivedCards.length === 0) && (
                    <div className="text-center p-4 text-xs text-muted-foreground bg-muted/20 rounded">
                        No archived cards found.
                    </div>
                )}
            </div>
        </div>
    );
};
