import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Input } from "@/shared/components/ui/input";

export const CardActivity = () => {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold text-base">Comments</h3>
            </div>

            <div className="flex gap-3">
                <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src="" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <Input
                        placeholder="Write a comment..."
                        className="bg-white"
                    />
                </div>
            </div>
        </div>
    );
};
