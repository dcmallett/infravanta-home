# Infravanta Home API

Python FastAPI service. Files are in place but not yet implemented.

## Setup (Windows PowerShell)

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -e ".[dev]"
copy .env.example .env
```

## Structure

```text
app/
├── main.py                 FastAPI app entry point
├── core/                   config, security (auth/permissions), logging
├── api/                    router registration and shared dependencies
├── db/                     database session and SQLAlchemy model registry
├── models/                 database models
├── schemas/                Pydantic schemas
├── modules/                one folder per domain, each with router.py + service.py
│   └── users, households, properties, bills, savings, advisor, subscriptions
├── integrations/           Supabase Storage, Stripe, AI provider
└── workers/                background processing
alembic/                    database migrations
tests/                      unit, integration, api
```
