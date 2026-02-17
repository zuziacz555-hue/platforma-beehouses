# Instrukcja wdrożenia online (Deployment Guide)

Aplikacja została przygotowana do działania w chmurze. Teraz musisz skonfigurować dwa serwery: jeden dla frontendu (Vercel) i jeden dla backendu (np. Render lub Railway).

## 1. Frontend (Vercel)
Vercel automatycznie wykryje Twój projekt z GitHuba dzięki plikowi `vercel.json`.

1.  Zaloguj się na [Vercel](https://vercel.com).
2.  Importuj repozytorium `platforma-beehouses`.
3.  **Ważne**: W "Environment Variables" dodaj:
    -   `NEXT_PUBLIC_BACKEND_URL`: Adres Twojego backendu (otrzymasz go w kroku 2, np. `https://beehouses-api.onrender.com`).
4.  Kliknij **Deploy**.

## 2. Backend (Render.com - Rekomendowane)
Render to darmowa i prosta platforma dla backendu w Node.js.

1.  Zaloguj się na [Render.com](https://render.com).
2.  Kliknij **New +** -> **Web Service**.
3.  Połącz się z GitHubem i wybierz to samo repozytorium.
4.  W ustawieniach:
    -   **Root Directory**: `backend`
    -   **Build Command**: `npm install && npx prisma generate`
    -   **Start Command**: `npm start`
5.  Dodaj **Environment Variables** (przykładowo):
    -   `DATABASE_URL`: `file:./dev.db` (Dla darmowego testu SQLite) *Uwaga: sqlite na Renderze będzie się resetować przy każdym restarcie, chyba że użyjesz "Disk". Zalecane przejście na PostgreSQL w przyszłości.*
    -   `JWT_SECRET`: Twoje tajne hasło.
6.  Po wdrożeniu otrzymasz link (np. `https://platforma-api.onrender.com`). **Wklej ten link do Vercela jako `NEXT_PUBLIC_BACKEND_URL`**.

## 3. Inicjalizacja bazy (Seed)
Po uruchomieniu backendu w chmurze, wejdź pod adres:
`https://twoj-api-url.onrender.com/api/seed`
...aby stworzyć konto admina w nowej bazie danych.
