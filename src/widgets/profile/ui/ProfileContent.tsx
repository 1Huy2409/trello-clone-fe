import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { ProfileHeader } from "@/entities/user/ui/ProfileHeader"
import { ProfileInfo } from "@/entities/user/ui/ProfileInfo"
import { EditProfileForm } from "@/features/profile/ui/EditProfileForm"
import { ChangePasswordForm } from "@/features/profile/ui/ChangePasswordForm"

export function ProfileContent() {
    return (
        <div className="container max-w-4xl mx-auto py-10 space-y-8">
            <ProfileHeader />

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-8">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <ProfileInfo />
                </TabsContent>
                <TabsContent value="settings" className="space-y-6">
                    <EditProfileForm />
                    <ChangePasswordForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}
