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
