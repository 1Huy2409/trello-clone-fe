import { Dialog, DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { CardDescription } from "./CardDescription";
import { CardActivity } from "./CardActivity";
import { CardQuickActions } from "./CardQuickActions";
import { CardMembers } from "./CardMembers";
import { useArchiveCard, useUpdateCard } from "@/entities/card/api/use-cards";
import { useChecklistsByCard } from "@/entities/checklist/api/use-checklists";
import { CardChecklist } from "./CardChecklist";
import type { Card } from "@/shared/lib/types";
import { toast } from "sonner";

interface CardSettingDialogProps {
    card: Card;
    isOpen: boolean;
    onClose: () => void;
    listName?: string;
}

export const CardSettingDialog = ({ card, isOpen, onClose, listName }: CardSettingDialogProps) => {
    const [title, setTitle] = useState(card.title);

    const { mutate: archiveCard } = useArchiveCard();
    const { mutate: updateCard } = useUpdateCard();
    const { data: checklists = [] } = useChecklistsByCard(card.id);

    const handleArchive = () => {
        archiveCard(card.id, {
            onSuccess: () => {
                toast.success("Card archived successfully");
                onClose();
            },
            onError: () => {
                toast.error("Failed to archive card");
            }
        });
    }

    const handleTitleBlur = () => {
        if (title !== card.title) {
            updateCard({ id: card.id, data: { title } }, {
                onError: () => {
                    setTitle(card.title); // Revert on error
                }
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[600px] h-fit max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-0 border-none shadow-xl rounded-xl custom-scrollbar">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <DialogTitle className="text-xl font-semibold">{listName || "In Progress"}</DialogTitle>
                </div>

                {/* Quick Actions */}
                <CardQuickActions cardId={card.id} />

                {/* Title */}
                <div className="mb-6">
                    <h3 className="font-semibold text-base mb-2">Title</h3>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleTitleBlur}
                        className="font-medium text-base"
                    />
                </div>

                {/* Description */}
                <CardDescription
                    description={card.description}
                    onSave={(newDesc) => {
                        updateCard({ id: card.id, data: { description: newDesc } });
                    }}
                />

                {/* Checklists */}
                {checklists.map((checklist) => (
                    <CardChecklist key={checklist.id} checklist={checklist} />
                ))}

                {/* Members */}
                <CardMembers />

                {/* Available Users / Comments or whatever is next */}
                <CardActivity />

                {/* Footer */}
                <div className="flex items-center justify-between mt-8 pt-4 border-t">
                    <Button variant="destructive" onClick={handleArchive} className="bg-red-600 hover:bg-red-700 text-white">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Archive Card
                    </Button>
                    <Button variant="secondary" onClick={onClose} className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
