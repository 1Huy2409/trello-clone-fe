import { useArchivedWorkspaces, useReopenWorkspace } from "@/entities/workspace/api/use-workspaces";
import { Button } from "@/shared/components/ui/button";
import { Loader2, RotateCcw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export function ArchivedWorkspaceList() {
    const { data: workspaces, isLoading } = useArchivedWorkspaces();
    const { mutate: reopenWorkspace, isPending: isReopening } = useReopenWorkspace();

    const handleReopen = (id: string, name: string) => {
        reopenWorkspace(id, {
            onSuccess: () => {
                toast.success(`Workspace "${name}" reopened successfully`);
            },
            onError: (error: any) => {
                toast.error(error.message || "Failed to reopen workspace");
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!workspaces || workspaces.length === 0) {
        return (
            <div className="text-center p-8 border rounded-lg bg-muted/20">
                <p className="text-muted-foreground">No archived workspaces found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="border rounded-lg divide-y bg-card">
                {workspaces.map((workspace) => (
                    <div key={workspace.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                        <div>
                            <h4 className="font-medium flex items-center gap-2">
                                {workspace.title}
                                <span className="text-[10px] bg-destructive/10 text-destructive px-1.5 py-0.5 rounded font-medium border border-destructive/20">Archived</span>
                            </h4>
                            {workspace.description && (
                                <p className="text-sm text-muted-foreground mt-1 max-w-md truncate">
                                    {workspace.description}
                                </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Hidden from dashboard
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReopen(workspace.id, workspace.title)}
                            disabled={isReopening}
                        >
                            {isReopening ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <RotateCcw className="w-4 h-4 mr-2" />
                            )}
                            Reopen
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
