# Ringkasan API Profil Neo Telemetri 2026

Dokumen ini berisi daftar endpoint API yang tersedia untuk backend Profil Neo Telemetri 2026.

## Base URL
`http://localhost:3000` (Default)

---

## 1. Authentication (`/api/auth`)

### Login Admin
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "identifier": "admin_username_or_email",
    "password": "securepassword"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Login successful",
    "token": "JWT_TOKEN",
    "admin": {
      "id": "uuid",
      "username": "admin_username",
      "email": "admin@neotelemetri.com",
      "role": "MARKETING | PR"
    }
  }
  ```

---

## 2. Marketing / Projects (`/api/marketing`)
*Membutuhkan Authentication & Role: `MARKETING`*

### List Semua Project
- **URL:** `/api/marketing/`
- **Method:** `GET`

### Get Project Detail (Slug)
- **URL:** `/api/marketing/:slug`
- **Method:** `GET`

### Create Project
- **URL:** `/api/marketing/`
- **Method:** `POST`
- **Body Type:** `multipart/form-data`
- **Fields:**
  - `name`: string (required)
  - `description`: string (required)
  - `division`: "Programming" | "Multimedia" | "SKJ" (required)
  - `category`:
    - **Programming:** "Web", "Mobile"
    - **Multimedia:** "ThreeD", "UI_UX", "VideoEditing"
    - **SKJ:** "ProxmoxVE", "Docker", "Nextcloud"
  - `projectLink`: string (url, optional)
  - `creationDate`: date string (ISO 8601, required)
  - `coverImage`: file (image, optional)

### Update Project
- **URL:** `/api/marketing/:id`
- **Method:** `PUT`
- **Body Type:** `multipart/form-data` (sama seperti Create)

### Delete Project
- **URL:** `/api/marketing/:id`
- **Method:** `DELETE`

### Dashboard Marketing
- **URL:** `/api/marketing/dashboard`
- **Method:** `GET`
- **Summary:** Mengembalikan total projects dan division stats.

---

## 3. PR / News (`/api/pr`)
*Membutuhkan Authentication & Role: `PR`*

### List Semua News
- **URL:** `/api/pr/`
- **Method:** `GET`

### Get News Detail (Slug)
- **URL:** `/api/pr/:slug`
- **Method:** `GET`

### Create News
- **URL:** `/api/pr/`
- **Method:** `POST`
- **Body Type:** `multipart/form-data`
- **Fields:**
  - `title`: string (required)
  - `shortDescription`: string (required)
  - `content`: text/string (required)
  - `coverImage`: file (image, optional)

### Update News
- **URL:** `/api/pr/:id`
- **Method:** `PUT`
- **Body Type:** `multipart/form-data` (sama seperti Create)

### Delete News
- **URL:** `/api/pr/:id`
- **Method:** `DELETE`

### Dashboard PR
- **URL:** `/api/pr/dashboard`
- **Method:** `GET`
- **Summary:** Mengembalikan total news dan recent activity.

---

## 4. Public (`/api/public`)
*Tanpa Authentication (Untuk website utama)*

### Public Projects
- **URL:** `/api/public/projects`
- **Method:** `GET`
- **URL Detail:** `/api/public/projects/:slug` (GET)

### Public News
- **URL:** `/api/public/news`
- **Method:** `GET`
- **URL Detail:** `/api/public/news/:slug` (GET)

---

## Dokumentasi Swagger (OpenAPI)
Anda juga dapat mengakses dokumentasi interaktif melalui:
- **UI:** `/api-docs`
- **JSON:** `/swagger.json`
