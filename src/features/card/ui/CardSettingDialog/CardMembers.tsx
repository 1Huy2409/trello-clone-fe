import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { X } from "lucide-react";
// import { Button } from "@/shared/components/ui/button";

export const CardMembers = () => {
    return (
        <div className="mb-6 space-y-4">
            <div>
                <h3 className="text-sm font-semibold mb-2">Assigned Users</h3>
                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center bg-secondary/50 rounded-full pl-1 pr-2 py-1 gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src="" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">John Doe</span>
                        <button className="text-muted-foreground hover:text-foreground">
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                    <div className="flex items-center bg-secondary/50 rounded-full pl-1 pr-2 py-1 gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">Jane Smith</span>
                        <button className="text-muted-foreground hover:text-foreground">
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
