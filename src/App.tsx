import { BrowserRouter, Route, Routes } from "react-router"
import LoginPage from "./pages/auth/LoginPage"
import { AuthLayout } from "./features/app/ui/AuthLayout"
import { AppLayout } from "./features/app/ui/AppLayout"
import DashboardPage from "./pages/dasboard/DashboardPage"
import SignupPage from "./pages/auth/RegisterPage"
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
