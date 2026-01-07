import { BrowserRouter, Route, Routes } from "react-router"
import { AuthLayout } from "./features/app/ui/AuthLayout"
import { AppLayout } from "./features/app/ui/AppLayout"
import LoginPage from "./pages/auth/ui/LoginPage"
import SignupPage from "./pages/auth/ui/RegisterPage"
import DashboardPage from "./pages/dasboard/ui/DashboardPage"
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
