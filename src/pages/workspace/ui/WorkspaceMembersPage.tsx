import { WorkspaceMembers } from "@/widgets/workspace/ui/WorkspaceMembers";
import { useWorkspace } from "@/entities/workspace/api/use-workspaces";
import { useParams } from "react-router";
import { PageLoader } from "@/shared/components/ui/page-loader";

export default function WorkspaceMembersPage() {
    const { id } = useParams<{ id: string }>();
    const { data: workspace, isLoading } = useWorkspace(id);

    if (isLoading) {
        return <PageLoader />;
    }

    // Find the workspace to ensure it exists
    if (!workspace) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Workspace not found
                    </h2>
                    <p className="text-gray-600">
                        The workspace you're looking for doesn't exist.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <WorkspaceMembers workspace={workspace} />
        </div>
    );
}
