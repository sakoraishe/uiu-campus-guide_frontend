# UIU Campus Guide – React frontend

Recovered from the Figma Make file "UIU Campus Guide Platform" and converted to plain React (JSX) + Vite + Tailwind CSS v4.

## Run
```bash
npm install
cp .env.example .env
npm run dev        # http://localhost:5173
```

## Roles / routes (all working with mock data)
| Role | Routes |
|---|---|
| Public | `/`, `/services`, `/services/:id`, `/mentors`, `/mentors/:id`, `/news`, `/events`, `/alerts`, `/resources`, `/stories`, `/achievements`, `/login`, `/register` |
| Student | `/dashboard`, `/dashboard/career`, `/roadmap/:careerName`, `/bookings`, `/profile`, `/settings` |
| Mentor | `/mentor/dashboard`, `services`, `bookings`, `profile`, `students`, `earnings`, `payments`, `reviews`, `notifications`, `settings` |
| Faculty | `/faculty/dashboard` |
| Admin | `/admin/dashboard`, `users`, `students`, `mentors`, `faculty`, `services`, `bookings`, `payments`, `stories`, `home-content`, `news`, `events`, `alerts`, `resources`, `achievements`, `departments`, `reports`, `settings` |

## Connecting the backend
- `src/services/api.js` is a ready fetch client (base URL from `VITE_BACKEND_API_URL`, Bearer token from localStorage).
- Data currently comes from `src/data/mockData.js` and module-level state in the admin/mentor pages.
  Replace one resource at a time (`mentors`, `services`, `bookings`, `news`, `events`, `alerts`, `resources`, `stories`, `achievements`, `departments`, `careerPaths`) with `api.get(...)` inside `useEffect`.
- Login is mocked in `src/context/AuthContext.jsx` (stores `{role,name,dept,email}` in localStorage). Change `login()` to call your friend's auth endpoint and store the token with `setToken`.
- Only `VITE_`-prefixed variables reach the browser. JWT secrets, Cloudinary API secret, Google client secret and NextAuth secret must stay on the backend.

## Known gaps in the recovery (please review)
The Figma Make export stored two files truncated. These parts were rebuilt by hand in the same style rather than copied from the design:
- `AdminPanel.jsx`: the table section of **Service Management**, plus the **Bookings**, **Payments** and **Home Content** admin pages.
- `ProfilePage.jsx`: reassembled from the last saved edits; compare it with the Figma preview.
