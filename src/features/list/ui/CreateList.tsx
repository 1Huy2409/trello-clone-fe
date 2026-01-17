import { useState, useRef, type ElementRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { useCreateList } from "@/entities/list/api/use-lists";
import { Button } from "@/shared/components/ui/button";

interface CreateListProps {
    boardId: string;
}

export const CreateList = ({ boardId }: CreateListProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const { mutate: createList } = useCreateList();

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
        setTitle("");
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                disableEditing();
            }
        };

        if (isEditing) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", onKeyDown);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isEditing]);

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        if (!title.trim()) return;

        createList({ boardId, data: { title } });
        setTitle("");
        inputRef.current?.focus();
    };

    if (isEditing) {
        return (
            <div className="w-72 shrink-0 ml-3 first:ml-0 shadow-md">
                <form
                    ref={formRef}
                    action={onSubmit}
                    className="w-full p-3 rounded-xl bg-white border border-slate-200 space-y-4"
                >
                    <input
                        ref={inputRef}
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition w-full outline-none rounded bg-transparent placeholder:text-muted-foreground"
                        placeholder="Enter list title..."
                    />
                    <div className="flex items-center gap-x-1">
                        <Button type="submit" size="sm" variant="default">
                            Add list
                        </Button>
                        <Button
                            onClick={disableEditing}
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            type="button"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="w-72 shrink-0 ml-3 first:ml-0">
            <button
                onClick={enableEditing}
                className="w-full rounded-xl bg-white/20 hover:bg-white/30 text-left p-3 font-medium text-sm transition-colors flex items-center text-slate-900 border border-slate-200 border-dashed hover:border-solid bg-slate-100"
            >
                <Plus className="h-4 w-4 mr-2" />
                Add another list
            </button>
        </div>
    );
};
