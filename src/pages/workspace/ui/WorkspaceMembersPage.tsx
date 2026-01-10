import { WorkspaceMembers } from "@/widgets/workspace/ui/WorkspaceMembers";
import { useCommonStore } from "@/shared/stores/commonStore";
import { useParams } from "react-router";

export default function WorkspaceMembersPage() {
    const { id } = useParams<{ id: string }>();
    const { workspaces } = useCommonStore();

    // Find the workspace to ensure it exists
    const workspace = workspaces.find((w) => w.id === id);

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
