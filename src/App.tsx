import { BrowserRouter, Route, Routes } from "react-router"
import { AuthLayout } from "./features/app/ui/AuthLayout"
import { AppLayout } from "./features/app/ui/AppLayout"
import LoginPage from "./pages/auth/ui/LoginPage"
import SignupPage from "./pages/auth/ui/RegisterPage"
import DashboardPage from "./pages/dasboard/ui/DashboardPage"
import WorkspacePage from "./pages/workspace/ui/WorkspacePage"
function App() {
  return (
    <BrowserRouter basename="/my-trello/">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignupPage />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="workspace/:id" element={<WorkspacePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
