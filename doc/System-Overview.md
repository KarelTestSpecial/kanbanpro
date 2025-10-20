# FullStack Kanban Pro: Systeemoverzicht

## Inleiding

Dit document beschrijft de technische architectuur en de componenten van het FullStack Kanban Pro-project. Het dient als een up-to-date referentie voor de huidige status van de codebase en vervangt alle voorgaande documenten in de `doc/`-map, die als verouderd moeten worden beschouwd.

## Backend

De backend is een Spring Boot-applicatie, gebouwd met Java 17 en Maven.

- **Framework**: Spring Boot 3
- **Taal**: Java 17
- **Build Tool**: Maven
- **Database**:
    - **Productie**: PostgreSQL met Flyway voor databasemigraties.
    - **Test**: H2 in-memory database.
- **Beveiliging**: Spring Security met JSON Web Tokens (JWT) voor authenticatie en autorisatie. De JWT-claims worden ondertekend met een geheim dat via omgevingsvariabelen wordt geconfigureerd.

## Frontend

De frontend is een single-page applicatie (SPA) gebouwd met React, TypeScript en Vite.

- **Framework**: React
- **Taal**: TypeScript
- **Build Tool**: Vite
- **UI-componenten**: Material-UI (`@mui/material`)
- **State Management**: Zustand
- **Drag-and-Drop**: `@dnd-kit`
- **Testen**: Vitest en React Testing Library

## CI/CD & Deployment

- **Continuous Integration**: GitHub Actions wordt gebruikt om de backend te bouwen en te testen bij elke push naar de repository.
- **Deployment**: De applicatie is gecontaineriseerd met Docker en Docker Compose voor eenvoudige deployment.

## Lokale Ontwikkeling

### Backend

Om de backend lokaal te draaien, moet je een PostgreSQL-database hebben draaien en de applicatie configureren met de juiste database-URL, gebruikersnaam en wachtwoord. Daarnaast moet je een JWT-geheim instellen via de `application.security.jwt.secret-key` eigenschap.

### Frontend

Om de frontend lokaal te draaien, installeer je de afhankelijkheden met `npm install` en start je de ontwikkelingsserver met `npm run dev`. De frontend verwacht dat de backend draait op `http://localhost:8080`.
