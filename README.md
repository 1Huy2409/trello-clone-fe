# Task Management (Trello Clone)

A comprehensive task management web application built with modern web technologies, inspired by Trello. This project supports workspaces, boards, Kanban-style lists, and tasks with granular role-based access control.

## Technology Stack

### Core
- **React 19**: UI Library.
- **TypeScript**: Static typing.
- **Vite**: Build tool and development server.

### State Management & Data Fetching
- **Zustand**: Global client-state management.
- **TanStack Query (React Query)**: Server-state management and caching.

### Styling & UI
- **TailwindCSS**: Utility-first CSS framework.
- **Shadcn UI**: Reusable components built with Radix UI.
- **Lucide React**: Icon set.

### Interaction & Utils
- **@hello-pangea/dnd**: Drag and drop library for Kanban boards.
- **React Hook Form + Zod**: Form handling and schema validation.
- **Axios**: HTTP client.

## Architecture

This project follows the **Feature-Sliced Design (FSD)** architecture to ensure scalability and maintainability.

- **`app/`**: Application setup (providers, router, styles).
- **`pages/`**: Composition of widgets to form full pages.
- **`widgets/`**: Large, independent UI blocks (e.g., Sidebar, BoardCanvas).
- **`features/`**: User interactions (e.g., Auth, CreateBoard, MoveList).
- **`entities/`**: Business entities (e.g., Board, Card, User, Workspace).
- **`shared/`**: Reusable infrastructure code (UI kit, API clients, helpers).

Each slice in `entities`, `features`, and `widgets` exposes a strictly defined **Public API** via `index.ts`.

## Features

- **Authentication**: Login, Registration, OTP Verification, Password Reset.
- **Workspaces**:
  - Create and manage workspaces.
  - Role-based Access Control (RBAC) with custom permissions.
  - Member management.
- **Boards**:
  - Kanban board view.
  - Drag and drop lists and cards.
  - Board visibility settings (Private, Workspace, Public).
- **Cards & Lists**:
  - Create, edit, archive, and delete.
  - Reorder via drag and drop.
  - Checklists and functional items.
- **Profile**: User profile management and avatar upload.

## Getting Started

### Prerequisites

- **Node.js**: v18 or higher.
- **pnpm**: Package manager (recommended).

### Installation (Manual)

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd trello-clone-fe
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Critique the `.env` file based on `.env.example` (if available) or create one manually.
   ```env
   VITE_API_URL=http://localhost:3000/api/v1
   ```

4. **Run the development server:**
   ```bash
   pnpm run dev
   ```

### Installation (Docker)

This project is configured with Docker for easy setup.

1. **Clone the repository.**
2. **Setup Environment Variables** (create `.env` file).
3. **Run with Docker Compose:**
   ```bash
   docker compose up --build
   ```
   The application will be accessible at `http://localhost:5173`.

## Scripts

- `pnpm run dev`: Start development server.
- `pnpm run build`: Build for production.
- `pnpm run lint`: Run ESLint.
- `pnpm run preview`: Preview production build locally.
