# FullStack Kanban Pro

Dit project is een portfolio-showcase, ontworpen om vaardigheden in full-stack webontwikkeling te demonstreren met een moderne en robuuste technologiestack.

## Live Applicatie

De applicatie wordt gehost op Render:

-   **Frontend (React App):** [https://kanbanpro-frontend.onrender.com](https://kanbanpro-frontend.onrender.com)
-   **Backend (Java API):** [https://kanbanpro-backend.onrender.com](https://kanbanpro-backend.onrender.com)

*Opmerking: De gratis diensten op Render kunnen in slaapstand gaan na een periode van inactiviteit en hebben mogelijk een minuut nodig om opnieuw op te starten.*

## Doel van het Project

Het hoofddoel van dit project is om een realistisch en uitgebreid voorbeeld te geven van competenties in softwareontwikkeling, waaronder:

-   **Full-Stack Ontwikkeling**: Realisatie van zowel een backend (Java/Spring Boot) als een frontend (React/TypeScript).
-   **Moderne Technologieën**: Gebruik van actuele en relevante frameworks en bibliotheken.
-   **Software Architectuur**: Implementatie van een duidelijke, schaalbare en veilige architectuur.
-   **Best Practices**: Toepassing van best practices op het gebied van codekwaliteit, versiebeheer, en geautomatiseerd testen.

## Technisch Overzicht

### Backend

-   **Taal**: Java 17
-   **Framework**: Spring Boot 3
-   **Beveiliging**: Spring Security met JSON Web Tokens (JWT)
-   **Database**: PostgreSQL (productie) & H2 (test)
-   **Databasemigraties**: Flyway
-   **Build Tool**: Maven

### Frontend

-   **Framework**: React
-   **Taal**: TypeScript
-   **Build Tool**: Vite
-   **UI Componenten**: Material-UI (`@mui/material`)
-   **State Management**: Zustand
-   **Drag-and-Drop**: `@dnd-kit`
-   **Testen**: Vitest & React Testing Library

## Lokale Ontwikkeling

### Vereisten

-   Java 17
-   Node.js 20
-   Docker (voor PostgreSQL)

### Backend

1.  **Start de database:**
    ```bash
    docker-compose up -d
    ```
2.  **Configureer de omgeving:**
    Zorg ervoor dat de `application.properties` in `backend/src/main/resources` de juiste database-URL, gebruikersnaam en wachtwoord bevat. Stel ook een JWT-geheim in via de `application.security.jwt.secret-key` eigenschap.
3.  **Start de applicatie:**
    ```bash
    cd backend
    ./mvnw spring-boot:run
    ```

### Frontend

1.  **Installeer de afhankelijkheden:**
    ```bash
    cd frontend
    npm install
    ```
2.  **Start de ontwikkelingsserver:**
    ```bash
    npm run dev
    ```
    De frontend is nu beschikbaar op `http://localhost:5173` en verwacht dat de backend draait op `http://localhost:8080`.

## Deployment op Render.com

Dit project is geconfigureerd voor eenvoudige deployment op [Render](https://render.com/).

### Initiële Setup

Om de applicatie van GitHub naar Render over te brengen, moet je twee aparte services aanmaken: een **Web Service** voor de frontend en een **Private Service** voor de backend.

#### 1. Backend Deployment (Private Service)

1.  **Maak een nieuwe PostgreSQL-database aan op Render.**
    *   Ga naar het "Databases"-gedeelte en maak een nieuwe PostgreSQL-database aan.
    *   Kopieer de **interne database-URL**; deze heb je nodig voor de backend-configuratie.

2.  **Maak een nieuwe Private Service aan en koppel deze aan je GitHub-repository.**
    *   **Runtime:** `Docker`
    *   **Build Command:** Render zal automatisch bouwen met de `Dockerfile` in de `backend`-map.
    *   **Start Command:** Render zal automatisch starten met de `CMD`-instructie in de `Dockerfile`.

3.  **Configureer de omgevingsvariabelen:**
    *   `SPRING_DATASOURCE_URL`: De interne database-URL van je PostgreSQL-database.
    *   `SPRING_DATASOURCE_USERNAME`: De gebruikersnaam van je PostgreSQL-database.
    *   `SPRING_DATASOURCE_PASSWORD`: Het wachtwoord van je PostgreSQL-database.
    *   `APPLICATION_SECURITY_JWT_SECRET_KEY`: Een lange, willekeurige en veilige string die wordt gebruikt als JWT-geheime sleutel.

#### 2. Frontend Deployment (Web Service)

1.  **Maak een nieuwe Web Service aan en koppel deze aan je GitHub-repository.**
    *   **Root Directory:** `frontend`
    *   **Build Command:** `npm install && npm run build`
    *   **Publish Directory:** `dist`

2.  **Configureer de omgevingsvariabelen:**
    *   `VITE_API_BASE_URL`: De URL van je backend-service op Render (bijv. `https://kanbanpro-backend.onrender.com/api`).

### Een Nieuwe Versie Publiceren

Render is geconfigureerd om automatisch te deployen wanneer er nieuwe commits naar de `main`-branch van je GitHub-repository worden gepusht.

1.  **Bouw en test je wijzigingen lokaal.**
    *   `cd backend && ./mvnw clean install`
    *   `cd frontend && npm test`

2.  **Commit en push je wijzigingen naar de `main`-branch.**
    ```bash
    git add .
    git commit -m "Beschrijvende commit-boodschap"
    git push origin main
    ```

3.  **Render zal de nieuwe commit detecteren en automatisch een nieuwe build en deployment starten voor de respectievelijke service (frontend of backend).** Je kunt de voortgang van de deployment volgen in je Render-dashboard.
