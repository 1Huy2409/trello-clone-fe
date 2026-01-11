import { useState, useRef } from "react"
import { useSessionStore } from "@/entities/session"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Textarea } from "@/shared/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card"
import { Alert, AlertDescription } from "@/shared/components/ui/alert"
import { uploadAvatar } from "../api/uploadAvatarApi"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Camera } from "lucide-react"
import { updateProfileApi } from "../api/updateProfileApi"

export function EditProfileForm() {
    const { user, setUser } = useSessionStore()
    const [formData, setFormData] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        description: user?.description || "",
    })
    const [message, setMessage] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        setMessage(null)
        try {
            const updatedUser = await uploadAvatar(file)
            if (user) {
                setUser({ ...user, ...updatedUser })
            } else {
                setUser(updatedUser)
            }
            setMessage("Avatar updated successfully.")
        } catch (error) {
            console.error("Avatar upload failed:", error)
            setMessage("Failed to upload avatar.")
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateProfileApi(formData)
        console.log("Updating profile:", formData)
        setMessage("Profile updated successfully (Mock).")

        // Mock update local store for immediate feedback
        if (user) {
            setUser({ ...user, ...formData })
        }

        setTimeout(() => setMessage(null), 3000)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-6">
                    {message && (
                        <Alert className={message.includes("Failed") ? "text-red-600 border-red-600" : "text-green-600 border-green-600"}>
                            <AlertDescription>{message}</AlertDescription>
                        </Alert>
                    )}

                    <div className="flex items-center gap-6">
                        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            <Avatar className="h-20 w-20 border-2 border-border">
                                <AvatarImage src={user?.avatarUrl} className="object-cover" />
                                <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={isUploading}
                            />
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-medium leading-none">Profile Picture</h4>
                            <p className="text-sm text-muted-foreground">
                                {isUploading ? "Uploading..." : "Click to change avatar. JPG, PNG or GIF."}
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input id="fullname" value={formData.fullname} onChange={handleChange} required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={formData.email} disabled className="bg-muted" />
                        <p className="text-[0.8rem] text-muted-foreground">Email cannot be changed.</p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Bio</Label>
                        <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Tell us about yourself" />
                    </div>
                    <Button type="submit" className="w-fit ml-auto">Save Changes</Button>
                </form>
            </CardContent>
        </Card>
    )
}
