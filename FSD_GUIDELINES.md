# Feature-Sliced Design (FSD) Guidelines for Trello Clone

## 1. Cấu trúc Thư mục (Directory Structure)

Dự án được chia thành các Layer chính theo thứ tự phụ thuộc một chiều:
`app` -> `pages` -> `widgets` -> `features` -> `entities` -> `shared`

```
src/
├── app/                  # App provider, router, global styles
├── pages/                # Các trang của ứng dụng (Composition Layer)
├── widgets/              # Các khối UI lớn, độc lập (VD: DashboardContent, BoardCanvas)
├── features/             # Các tính năng tương tác (User Actions)
├── entities/             # Các thực thể nghiệp vụ (Domain Models & UI hiển thị)
└── shared/               # Code dùng chung, không chứa logic nghiệp vụ (UI Kit, helpers)
```

## 2. Chi tiết từng Layer & Quy tắc

### A. Shared (`@/shared`)
- **Mục đích**: Chứa các thành phần reusable, không phụ thuộc vào nghiệp vụ cụ thể.
- **Thành phần**: UI components (shadcn/ui), hooks, libs, types, stores (nếu store là global và generic).
- **Quy tắc**: Không đuợc import từ bất kỳ layer nào khác.

### B. Entities (`@/entities`)
- **Mục đích**: Hiển thị dữ liệu của các thực thể nghiệp vụ (Business Units). Thường là components "tĩnh" hoặc ít tương tác logic phức tạp.
- **Cấu trúc**: `entities/{slice}/{segment}/`
  - VD: `entities/board/ui/BoardCard.tsx`
  - VD: `entities/list/ui/List.tsx`
- **Quy tắc**:
  - Chỉ chứa logic hiển thị.
  - Nhận data và các callback actions qua props.
  - Không subscribe trực tiếp vào store phức tạp nếu có thể tránh (để giữ component pure).

### C. Features (`@/features`)
- **Mục đích**: Xử lý các tương tác của người dùng (User Interactions) mang lại giá trị nghiệp vụ (VD: `CreateBoard`, `EditBoard`, `DragDropList`).
- **Cấu trúc**: `features/{slice}/{segment}/`
  - **Lưu ý quan trọng**: Ưu tiên cấu trúc phẳng theo Slice.
  - VD: `features/board/ui/EditBoardDialog.tsx` (Thay vì lồng quá sâu như `features/board/edit/ui/...`)
  - VD: `features/list/ui/ListOptions.tsx`
- **Quy tắc**:
  - Có thể chứa dialogs, forms, buttons có logic xử lý.
  - Sử dụng API/Stores để thực hiện hành động.
  - Compose `entities` và `shared`.

### D. Widgets (`@/widgets`)
- **Mục đích**: Các khối UI lớn, ghép nối (`compose`) các Features và Entities lại với nhau để tạo thành một chức năng hoàn chỉnh trên trang.
- **Cấu trúc**: `widgets/{slice}/{ui}/`
  - VD: `widgets/dashboard/ui/DashboardContent.tsx` (Ghép `WorkspaceCard`, `BoardCard`, `CreateBoardDialog`...)
  - VD: `widgets/board/ui/BoardCanvas.tsx` (Ghép `List` entity, `DragDrop` logic, `CreateList` feature...)
- **Quy tắc**:
  - Đóng vai trò như "Layout" cho một phần nghiệp vụ.
  - Chịu trách nhiệm fetch data ban đầu hoặc kết nối data context cho các con.

### E. Pages (`@/pages`)
- **Mục đích**: Route components.
- **Quy tắc**:
  - **Rất mỏng (Thin)**. Hầu như chỉ render một hoặc vài Widgets.
  - Không chứa logic nghiệp vụ phức tạp.
  - Connect layout chính (Sidebar, Header) với content (Widget).

## 3. Quy trình phát triển tính năng mới (Workflow)

Khi thêm một tính năng mới (ví dụ: "Bình luận vào Card"), hãy tuân thủ các bước:

1.  **Phân tích Chi tiết**:
    *   **Entity**: Tạo `entities/comment/ui/CommentItem.tsx` (Hiển thị avatar, nội dung, ngày giờ).
    *   **Feature**: Tạo `features/comment/ui/AddCommentForm.tsx` (Input nhập liệu, nút Gửi, logic call API api).
    *   **Widget**: Tạo hoặc cập nhật `widgets/card/ui/CardDetailModal.tsx` để nhúng `CommentItem` và `AddCommentForm` vào.

2.  **Đặt tên (Naming Convention)**:
    *   File component: `PascalCase.tsx` (VD: `BoardCard.tsx`)
    *   Thư mục slice: `kebab-case` (VD: `board`, `workspace`)
    *   Segments: `ui`, `model`, `lib`, `api`.

3.  **Imports**:
    *   Luôn dùng Absolute Imports (`@/...`).
    *   Tuân thủ chiều phụ thuộc: `Page` -> `Widget` -> `Feature` -> `Entity` -> `Shared`.
    *   **Cấm**: Entity import Feature (Circular Dependency), Shared import Entity.

## 4. Ví dụ Reference hiện tại
- **Widget Dashboard**: `src/widgets/dashboard/ui/DashboardContent.tsx`
- **Widget Board**: `src/widgets/board/ui/BoardCanvas.tsx`
- **Feature Edit Board**: `src/features/board/ui/EditBoardDialog.tsx`
- **Entity Board Card**: `src/entities/board/ui/BoardCard.tsx`
