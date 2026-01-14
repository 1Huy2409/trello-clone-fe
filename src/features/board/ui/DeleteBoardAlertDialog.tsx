import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { useDeleteBoard } from "@/entities/board/api/use-boards";
import { toast } from "sonner";

interface DeleteBoardAlertDialogProps {
    boardId: string | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeleteBoardAlertDialog({ boardId, open, onOpenChange }: DeleteBoardAlertDialogProps) {
    const { mutate: deleteBoard, isPending } = useDeleteBoard();

    const handleDelete = () => {
        if (!boardId) return;

        deleteBoard(boardId, {
            onSuccess: () => {
                toast.success("Board deleted successfully");
                onOpenChange(false);
            },
            onError: (error) => {
                toast.error("Failed to delete board");
                console.error("Delete board error:", error);
            }
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the board
                        and move it to the trash (or delete permanently depending on implementation).
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        disabled={isPending}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
