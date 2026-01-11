import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { useSessionStore } from "@/entities/session"
import { Label } from "@/shared/components/ui/label"

export function ProfileInfo() {
    const user = useSessionStore((state) => state.user)

    if (!user) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-2">
                    <Label className="text-muted-foreground">Full Name</Label>
                    <div className="font-medium">{user.fullname}</div>
                </div>
                <div className="grid gap-2">
                    <Label className="text-muted-foreground">Username</Label>
                    <div className="font-medium">@{user.username}</div>
                </div>
                <div className="grid gap-2">
                    <Label className="text-muted-foreground">Email</Label>
                    <div className="font-medium">{user.email}</div>
                </div>
                <div className="grid gap-2">
                    <Label className="text-muted-foreground">Bio</Label>
                    <div className="font-medium">{user.description || "No description provided."}</div>
                </div>
            </CardContent>
        </Card>
    )
}
