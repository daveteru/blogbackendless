# Login Page Flow

## 1. Overview

The login feature allows users to authenticate with the Backendless backend. It uses a controlled form with client-side validation before making the API call.

---

## 2. Tech Stack

| Library | Purpose |
|---|---|
| React 19 | UI component |
| React Hook Form | Form state management |
| Zod | Schema validation |
| `@hookform/resolvers/zod` | Connects Zod to React Hook Form |
| Axios | HTTP requests |
| Tailwind CSS | Styling |
| Lucide React | Icons (Mail, Lock) |

---

## 3. File References

| File | Role |
|---|---|
| `src/pages/Login.tsx` | Main login component |
| `src/lib/axios.ts` | Axios instance with Backendless base URL |
| `src/main.tsx` | Route definition for `/login` |

---

## 4. Login Flow (Step by Step)

1. User navigates to `/login`
2. Form renders with **email** and **password** fields — Tailwind-styled inputs with Lucide icons
3. React Hook Form manages field state via `register`
4. On submit → Zod validates:
   - Email must be a valid email format
   - Password must be at least 6 characters
5. If **invalid** → inline error messages appear below each field; no API call is made
6. If **valid** → `setIsLoad(true)` → submit button changes to `"Logging in..."`
7. Axios POST is called:
   ```
   POST https://toughground-us.backendless.app/api/users/login
   Body: { login: email, password: password }
   ```
   > **Note:** The body field is `login`, not `email` — this is a Backendless API requirement.
8. **Success** → `alert("Login Success")`
9. **Failure** → `alert("Login Failed")` + `console.log(error)`
10. `finally` block → `setIsLoad(false)` (button returns to normal)

---

## 5. Form Validation (Zod Schema)

```ts
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

- The `zodResolver` from `@hookform/resolvers/zod` is passed to `useForm` as the `resolver` option.
- Validation runs on form submit; errors are displayed inline beneath each field.

---

## 6. Current Limitations

- **No token storage** — the Backendless user token returned on success is not saved (localStorage, sessionStorage, or cookie)
- **No redirect** — user stays on `/login` after a successful login
- **No auth state** — no React context, Zustand store, or similar to track the logged-in user globally
- **No protected routes** — any page is accessible regardless of login status
- **No logout** — there is no mechanism to sign the user out
- **Generic error handling** — all failures surface as a plain `alert("Login Failed")`

---

## 7. Navigation

- A link at the bottom of the login form navigates to `/register`
- The site Navbar includes a Login link that points to `/login`
