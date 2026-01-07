import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h2>
                    <p className="text-muted-foreground">
                        Manage your workspaces and boards
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Workspace
                    </Button>
                </div>  
            </div>
        </div>
    );
}