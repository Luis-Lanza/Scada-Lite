# SCADA-Lite

**SCADA-Lite** es una aplicación fullstack para monitoreo de sensores industriales en tiempo real, con backend en FastAPI (Python) y frontend en React (Vite), para producción con Docker y docker-compose.

---

## Características principales
- **Backend:** FastAPI simula sensores industriales, expone API REST y almacena datos en SQLite.
- **Frontend:** React + Vite visualiza datos en tiempo real con gráficos profesionales.
- **Docker:** Contenedores independientes para backend y frontend, orquestados con docker-compose.
---

## Estructura del proyecto
```
scada-lite/
├── backend/           # Backend FastAPI (Python)
│   ├── app/
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/          # Frontend React (Vite)
│   ├── src/
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml # Orquestación de servicios
└── README.md
```

---

## Requisitos
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)

---

## Uso rápido

1. **Clona el repositorio y entra a la carpeta:**
   ```bash
   git clone <REPO_URL>
   cd scada-lite
   ```
2. **Levanta toda la app:**
   ```bash
   docker-compose up --build
   ```
3. **Accede al frontend:**
   - [http://localhost:5173](http://localhost:5173)

---

## Endpoints principales del backend
- `GET /api/sensores/` — Historial completo de sensores
- `GET /api/sensores/latest` — Última lectura por tipo
- `GET /api/sensores/report` — Reporte completo

---
