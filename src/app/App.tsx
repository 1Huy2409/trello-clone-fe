import { BrowserRouter, Route, Routes } from "react-router"
import { AuthLayout } from "./layouts/AuthLayout"
import { AppLayout } from "./layouts/AppLayout"
import LoginPage from "../pages/auth/ui/LoginPage"
import SignupPage from "../pages/auth/ui/RegisterPage"
import DashboardPage from "../pages/dashboard/ui/DashboardPage"
import VerifyPage from "@/pages/auth/ui/VerifyPage"
import WorkspacePage from "../pages/workspace/ui/WorkspacePage"
import WorkspaceSettingsPage from "../pages/workspace/ui/WorkspaceSettingsPage"
import WorkspaceMembersPage from "../pages/workspace/ui/WorkspaceMembersPage"

import BoardPage from "../pages/board/ui/BoardPage"
import { ProtectedRoute } from "@/features/auth/ui/ProtectedRoute"
import { PublicRoute } from "@/features/auth/ui/PublicRoute"

function App() {
  return (
    <BrowserRouter basename="/my-trello/">
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<SignupPage />} />
            <Route path="verify" element={<VerifyPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="workspace/:id" element={<WorkspacePage />} />
            <Route path="workspace/:id/settings" element={<WorkspaceSettingsPage />} />
            <Route path="workspace/:id/members" element={<WorkspaceMembersPage />} />
            <Route path="board/:id" element={<BoardPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
