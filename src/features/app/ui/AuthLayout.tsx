import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <div className="w-full h-screen bg-gray-50">
        <Outlet />
    </div>
  );
}
