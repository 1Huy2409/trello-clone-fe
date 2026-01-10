import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"

export function ChangePasswordForm() {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New passwords do not match.")
            return
        }

        if (formData.newPassword.length < 6) {
            setError("Password must be at least 6 characters.")
            return
        }

        // TODO: Call API to change password
        console.log("Changing password")
        setSuccess("Password changed successfully (Mock).")
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
        setTimeout(() => setSuccess(null), 3000)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {success && (
                        <Alert className="text-green-600 border-green-600">
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}
                    <div className="grid gap-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" value={formData.currentPassword} onChange={handleChange} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" value={formData.newPassword} onChange={handleChange} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>
                    <Button type="submit" className="w-fit ml-auto">Update Password</Button>
                </form>
            </CardContent>
        </Card>
    )
}
