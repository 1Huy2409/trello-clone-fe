import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { useSessionStore } from "@/entities/session"

export function ProfileHeader() {
    const user = useSessionStore((state) => state.user)

    if (!user) return null

    return (
        <div className="flex flex-col items-center gap-4 py-6">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                <AvatarImage src={user.avatarUrl} alt={user.fullname} className="object-cover" />
                <AvatarFallback className="text-2xl">{user.fullname?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center">
                <h1 className="text-2xl font-bold">{user.fullname}</h1>
                <p className="text-muted-foreground">@{user.username}</p>
                {user.description && (
                    <p className="mt-2 text-sm text-muted-foreground w-full max-w-sm mx-auto">
                        {user.description}
                    </p>
                )}
            </div>
        </div>
    )
}
