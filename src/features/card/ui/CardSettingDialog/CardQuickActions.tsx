import { Button } from "@/shared/components/ui/button";
import { Tag, CheckSquare, UserPlus } from "lucide-react";

export const CardQuickActions = () => {
    return (
        <div className="flex items-center gap-3 mb-6">
            <Button variant="outline" size="sm" className="h-9 px-3 text-sm font-medium rounded-md shadow-sm">
                <Tag className="h-4 w-4 mr-2" />
                Add tags
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-3 text-sm font-medium rounded-md shadow-sm">
                <CheckSquare className="h-4 w-4 mr-2" />
                Add todo
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-3 text-sm font-medium rounded-md shadow-sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add member
            </Button>
        </div>
    );
};
