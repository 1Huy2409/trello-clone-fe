import { Search } from 'lucide-react';
import { useContext } from 'react';
import { WorkspaceDisplayContext } from '@/features/workspace/shared/context'; // Updated import path to match existing structure (assuming context stays)
import { Input } from '@/shared/components/ui/input';

export default function SearchInput() {
    const { setSearchQuery } = useContext(WorkspaceDisplayContext);
    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Search boards..."
                className="pl-9"
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
}
