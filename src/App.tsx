import { BrowserRouter, Route, Routes } from "react-router"
import LoginPage from "./pages/auth/LoginPage"
import { AuthLayout } from "./features/app/ui/AuthLayout"
import { AppLayout } from "./features/app/ui/AppLayout"
import DashboardPage from "./pages/dasboard/DashboardPage"
function App() {
  return (
    <BrowserRouter basename="/my-trello/">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
