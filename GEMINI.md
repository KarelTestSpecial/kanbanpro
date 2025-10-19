# FullStack Kanban Pro: Projectarchitectuur

Dit document definieert de volledige architectuur en technologiestack voor de "FullStack Kanban Pro" applicatie.

## 1. Algemeen Overzicht

**Doel:** Een full-stack Kanban board applicatie waar gebruikers hun taken kunnen beheren in een visuele workflow.

**Kernvereiste:** De applicatie moet multi-user zijn, waarbij alle data (taken, kolommen, etc.) strikt gescheiden is per gebruiker. De API moet op een veilige manier afdwingen dat een gebruiker enkel en alleen zijn eigen data kan zien en manipuleren.

## 2. Backend

- **Taal:** Java 17
- **Framework:** Spring Boot 3
- **Build Tool:** Maven
- **Beveiliging:** Spring Security met JWT (JSON Web Tokens) voor stateless authenticatie.
- **Data Access:** Spring Data JPA (Hibernate) voor object-relationele mapping.
- **Database Migraties:** Flyway voor het beheren van de database schema evolutie.
- **Utilities:** Project Lombok om boilerplate code (getters, setters, constructors) te reduceren.

### API Architectuur

- **Stijl:** RESTful API
- **Authenticatie:** Gebruikers authenticeren via een `/api/auth/login` endpoint en ontvangen een JWT.
- **Autorisatie:** Elke API-request (behalve voor authenticatie) vereist een `Authorization: Bearer <token>` header. De backend valideert de token en koppelt de request aan een specifieke gebruiker. Alle database queries voor taken, kolommen, etc., moeten een `WHERE userId = :currentUserId` clausule bevatten.

## 3. Database

- **Systeem:** PostgreSQL
- **Schema:** Het schema wordt beheerd door Flyway. De belangrijkste tabellen zijn `users`, `boards`, `columns`, en `tasks`. Elke tabel die gebruikersspecifieke data bevat, moet een `user_id` foreign key kolom hebben die verwijst naar de `users` tabel.

## 4. Frontend

- **Framework:** React (met TypeScript)
- **UI Bibliotheek:** Material-UI (MUI) voor een moderne en consistente look-and-feel.
- **State Management:** Zustand voor een eenvoudige en efficiënte globale state management.
- **Drag & Drop:** `react-beautiful-dnd` voor het slepen en neerzetten van taken en kolommen.
- **Styling:** Emotion (gebruikt door MUI) of `styled-components`.

### Frontend Structuur

- **Componenten:** Een duidelijke scheiding tussen "smart" container componenten (die data fetchen en state beheren) en "dumb" presentatiecomponenten.
- **API Communicatie:** Gebruik van `axios` of de `fetch` API voor communicatie met de backend. Een centrale API-service die de JWT token automatisch aan elke request toevoegt.

## 5. Testing

- **Backend (Java):**
    - **Unit Tests:** JUnit 5 en Mockito voor het testen van services en controllers in isolatie.
    - **Integratie Tests:** Spring Boot's `@SpringBootTest` voor het testen van de API-laag met een testdatabase.
- **Frontend (React):**
    - **Unit/Component Tests:** Jest en React Testing Library (RTL) voor het testen van individuele componenten.
    - **End-to-End (Optioneel):** Cypress of Playwright.

## 6. Deployment

- **Containerisatie:** Docker
    - Een `Dockerfile` voor de Spring Boot backend.
    - Een `Dockerfile` voor de React frontend (multi-stage build met Nginx).
- **Orchestratie:** Docker Compose om de backend, frontend, en PostgreSQL database lokaal en in productie te beheren.
- **Continuous Integration/Continuous Deployment (CI/CD):** GitHub Actions
    - Een workflow die automatisch tests uitvoert bij elke push.
    - Een workflow die, bij een push naar de `main` branch, de applicatie build, Docker images aanmaakt, en deze deployt naar een server.