import { Separator } from "@/shared/components/ui/separator";
import { ArchivedWorkspaceList } from "@/features/workspace/ui/ArchivedWorkspaceList";

export function SettingPage() {
    return (
        <div className="w-full px-8 py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your global application settings and preferences.
                </p>
            </div>

            <Separator />

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight">Archived Workspaces</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        These workspaces are hidden from your dashboard. You can reopen them any time.
                    </p>
                </div>

                <ArchivedWorkspaceList />
            </div>
        </div>
    );
}
