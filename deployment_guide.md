# Instrukcja Bazy Danych (Dla Vercel)

To jest najważniejszy krok, żeby strona działała "na stałe" w internecie.

## 1. Załóż bazę danych (Darmowa i szybka)
Najprościej jest użyć **Neon.tech**:
1. Wejdź na [Neon.tech](https://neon.tech) i zaloguj się przez GitHub.
2. Stwórz nowy projekt (nazwij go np. `zapylacze`).
3. Po stworzeniu zobaczysz napis **"Connection String"**. Skopiuj go (wygląda tak: `postgresql://user:password@xxxxxxxx.neon.tech/neondb?sslmode=require`).

## 2. Podłącz bazę do Vercela
1. Wejdź w swój projekt na Vercel.
2. Wejdź w zakładkę **Settings** -> **Environment Variables**.
3. Dodaj nową zmienną:
   - **NAME**: `DATABASE_URL`
   - **VALUE**: To, co skopiowałaś z Neon.tech.
4. Kliknij **Add**.

## 3. Aktywuj bazę (Seed)
Kiedy Vercel skończy budować stronę, wejdź pod adres:
`https://twoja-strona.vercel.app/api/seed`
To stworzy konto admina w nowej bazie.

---
**Dlaczego musimy to zrobić?**
Twój komputer ma plik `dev.db`, który trzyma dane. Vercel nie pozwala na zapisywanie plików podczas działania strony, więc musimy mu dać "zewnętrzny mózg" (bazę Neon), w którym będzie mógł zapisywać użytkowników i ich postępy.
