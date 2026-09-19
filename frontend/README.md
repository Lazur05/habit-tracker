# Habit Tracker 🌱

Aplikacja webowa do śledzenia codziennych nawyków — z historią wykonań, licznikiem streaków i heatmapą aktywności w stylu GitHub contributions.

Projekt stworzony jako ćwiczenie fullstack: FastAPI (Python) na backendzie + React/TypeScript na froncie.

## Funkcjonalności

- 🔐 Rejestracja i logowanie (JWT)
- ✅ Dodawanie i odznaczanie nawyków ("zrobione dziś")
- 🔥 Automatyczne liczenie streaków (dni z rzędu)
- 📊 Heatmapa aktywności za ostatnie 3 miesiące
- 🎨 Własny design system (Tailwind CSS v4)

## Stack technologiczny

**Backend**
- FastAPI
- SQLAlchemy + SQLite
- JWT (python-jose) + bcrypt

**Frontend**
- React + TypeScript (Vite)
- Tailwind CSS v4
- React Router

## Uruchomienie lokalnie

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Serwer wystartuje na `http://127.0.0.1:8000`. Dokumentacja API (Swagger) dostępna pod `http://127.0.0.1:8000/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplikacja wystartuje na `http://localhost:5173`.

> Baza danych (`habits.db`) tworzy się automatycznie przy pierwszym uruchomieniu backendu — nie wymaga ręcznej konfiguracji.

## Struktura projektu

```
habit-tracker/
├── backend/# Habit Tracker 🌱

Aplikacja webowa do śledzenia codziennych nawyków — z historią wykonań, licznikiem streaków i heatmapą aktywności w stylu GitHub contributions.

Projekt stworzony jako ćwiczenie fullstack: FastAPI (Python) na backendzie + React/TypeScript na froncie.

## Funkcjonalności

- 🔐 Rejestracja i logowanie (JWT)
- ✅ Dodawanie i odznaczanie nawyków ("zrobione dziś")
- 🔥 Automatyczne liczenie streaków (dni z rzędu)
- 📊 Heatmapa aktywności za ostatnie 3 miesiące
- 🎨 Własny design system (Tailwind CSS v4)

## Stack technologiczny

**Backend**
- FastAPI
- SQLAlchemy + SQLite
- JWT (python-jose) + bcrypt

**Frontend**
- React + TypeScript (Vite)
- Tailwind CSS v4
- React Router

## Uruchomienie lokalnie

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Serwer wystartuje na `http://127.0.0.1:8000`. Dokumentacja API (Swagger) dostępna pod `http://127.0.0.1:8000/docs`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplikacja wystartuje na `http://localhost:5173`.

> Baza danych (`habits.db`) tworzy się automatycznie przy pierwszym uruchomieniu backendu — nie wymaga ręcznej konfiguracji.

## Struktura projektu

```
habit-tracker/
├── backend/
│   ├── main.py          # endpointy API
│   ├── models.py        # modele SQLAlchemy
│   ├── schemas.py       # walidacja Pydantic
│   ├── auth.py          # logika JWT i haseł
│   └── database.py      # konfiguracja bazy danych
└── frontend/
    └── src/
        ├── api/          # komunikacja z backendem
        ├── components/   # komponenty UI
        ├── pages/        # widoki (Login, Register, Dashboard)
        └── context/      # zarządzanie stanem autoryzacji
```

## Główne endpointy API

| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/auth/register` | Rejestracja nowego użytkownika |
| POST | `/auth/login` | Logowanie, zwraca token JWT |
| GET | `/habits` | Lista nawyków zalogowanego użytkownika |
| POST | `/habits` | Dodanie nowego nawyku |
| POST | `/habits/{id}/complete` | Odznaczenie nawyku jako zrobiony dziś |
| DELETE | `/habits/{id}/complete` | Cofnięcie odznaczenia |
| GET | `/stats/heatmap` | Dane do heatmapy (ostatnie 90 dni) |

## Możliwe rozszerzenia

- Edycja i usuwanie nawyków
- Heatmapa per nawyk (obecnie zbiorcza)
- Powiadomienia / przypomnienia
- Eksport statystyk

## Autor

Projekt stworzony w ramach nauki fullstack developmentu (Python/FastAPI + React).
│   ├── main.py          # endpointy API
│   ├── models.py        # modele SQLAlchemy
│   ├── schemas.py       # walidacja Pydantic
│   ├── auth.py          # logika JWT i haseł
│   └── database.py      # konfiguracja bazy danych
└── frontend/
    └── src/
        ├── api/          # komunikacja z backendem
        ├── components/   # komponenty UI
        ├── pages/        # widoki (Login, Register, Dashboard)
        └── context/      # zarządzanie stanem autoryzacji
```

## Główne endpointy API

| Metoda | Endpoint | Opis |
|--------|----------|------|
| POST | `/auth/register` | Rejestracja nowego użytkownika |
| POST | `/auth/login` | Logowanie, zwraca token JWT |
| GET | `/habits` | Lista nawyków zalogowanego użytkownika |
| POST | `/habits` | Dodanie nowego nawyku |
| POST | `/habits/{id}/complete` | Odznaczenie nawyku jako zrobiony dziś |
| DELETE | `/habits/{id}/complete` | Cofnięcie odznaczenia |
| GET | `/stats/heatmap` | Dane do heatmapy (ostatnie 90 dni) |

## Możliwe rozszerzenia

- Edycja i usuwanie nawyków
- Heatmapa per nawyk (obecnie zbiorcza)
- Powiadomienia / przypomnienia
- Eksport statystyk

## Autor
Lazur05 + Claude.ai

Projekt stworzony w ramach nauki fullstack developmentu (Python/FastAPI + React).