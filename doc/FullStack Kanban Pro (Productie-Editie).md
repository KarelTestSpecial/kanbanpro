Uitstekend. We pakken dit aan met de precisie van een chirurgische ingreep.

Hier is **Stap 1**: De zorgvuldig opgestelde, zeer uitgebreide en zelfverklarende prompt. Deze prompt is ontworpen om elke LLM te instrueren hoe een bouwplan van topkwaliteit te genereren, specifiek voor de Gemini CLI Coding Agent.

---

### **Prompt: Genereer het Canonieke Bouwplan voor de "FullStack Kanban Pro" Portfolio Applicatie**

**U bent een Senior Solutions Architect. Uw missie is het genereren van een *productiegericht Build Manual* (bouwplan). Dit plan dient als een reeks onweerlegbare, imperatieve instructies voor een AI-assistent, de Google Gemini CLI Coding Agent. Het einddoel is de creatie van een indrukwekkende, full-stack webapplicatie die fungeert als een overtuigend portfolio-stuk voor een senior software engineer-sollicitatieprocedure.**

Het bouwplan moet onvoorwaardelijk voldoen aan de volgende vijf **Pijlers van een Professioneel Portfolio Project**:

**Pijler 1: Architecturale Integriteit (`GEMINI.md`)** Het plan MOET beginnen met de creatie van een `GEMINI.md`\-bestand. Dit bestand is de "grondwet" van het project. Het moet de volledige architectuur, de geselecteerde technologieën, de coderingsstandaarden, de mappenstructuur en de sleutelvereisten (zoals authenticatie en persistentie) ondubbelzinnig definiëren.

**Pijler 2: Realistische Data Persistentie (PostgreSQL & Flyway)** Het project moet de "speelgoed"-fase overstijgen. Het plan moet een productieklare PostgreSQL-database integreren via Docker Compose. Cruciaal hierbij is het gebruik van **Flyway** voor database-migraties, wat aantoont dat de kandidaat gestructureerd met databaseschema's kan omgaan.

**Pijler 3: Beveiliging als Prioriteit (Spring Security & JWT)** De applicatie moet veilig zijn. Het plan moet de implementatie van **Spring Security** met **JSON Web Tokens (JWT)** voor authenticatie en autorisatie omvatten. Dit omvat beveiligde endpoints, een login/registratie-flow en het principe dat taken gebruiker-specifiek zijn.

**Pijler 4: Kwaliteitsborging (Testing & CI/CD)** Code zonder tests is onvolledig. Het plan moet expliciete stappen bevatten voor het genereren van zowel **backend unit tests (JUnit/Mockito)** als **frontend component tests (Jest/React Testing Library)**. Bovendien moet het een basis **GitHub Actions workflow** opzetten voor continue integratie.

**Pijler 5: Commando-Gedreven Uitvoering (`!` & `@`)** Elke stap in het plan moet een direct uitvoerbare prompt zijn. Vage instructies zijn verboden. Gebruik de `!`\-operator voor alle shell-taken (project setup, dependency management, builds) en de `@`\-operator voor alle atomaire code-generatie en \-modificatie.

---

### **Project Specificaties: "FullStack Kanban Pro"**

**Functionele Vereisten:**

* Gebruikersregistratie en login.  
* Een Kanban-bord waar taken **gebruiker-specifiek** zijn.  
* CRUD-functionaliteit voor taken.  
* Drag-and-drop functionaliteit om de status van taken te wijzigen.

**Technische Stack:**

* **Backend:** Java 17, Spring Boot 3, Maven, Spring Security (JWT), Spring Data JPA, Lombok, Flyway.  
* **Database:** PostgreSQL (draaiend in Docker).  
* **Frontend:** ReactJS, TypeScript, Material-UI (voor een professionele look), Zustand (voor state management), `react-beautiful-dnd` (voor drag-and-drop).  
* **Testing:** JUnit 5, Mockito, Jest, React Testing Library.  
* **Deployment:** Docker, Docker Compose.  
* **CI/CD:** GitHub Actions.

---

### **Verwachte Output: Het Genereerde Bouwplan**

Genereer een genummerde lijst van **20 tot 25 gedetailleerde stappen**, logisch geordend in de volgende fases:

1. **Fase 1: Fundering en Context (`GEMINI.md`)**  
2. **Fase 2: Backend Ontwikkeling (inclusief Beveiliging & Database Migraties)**  
3. **Fase 3: Frontend Ontwikkeling (inclusief UI, State & Authenticatie Flow)**  
4. **Fase 4: Kwaliteitsborging (Tests & CI/CD Workflow)**  
5. **Fase 5: Integratie en Deployment (Docker & Docker Compose)**

**Begin het plan met de creatie van de projectmap. Eindig met het finale `docker-compose up` commando.**

**Voorbeeld van de vereiste stap-formulering:**

* `(Context)`: `Genereer het GEMINI.md bestand. Definieer de volledige stack, inclusief PostgreSQL, Spring Security, JWT, Flyway, Material-UI, en GitHub Actions.`  
* `(Database)`: `@backend/src/main/resources/db/migration/V1__Create_User_And_Task_Tables.sql Genereer de SQL-code om de 'users' en 'task' tabellen aan te maken, met een foreign key relatie tussen de twee.`  
* `(Security)`: `@backend/src/main/java/com/kanban/security/SecurityConfig.java Genereer de Spring Security configuratieklasse die de JWT-filter integreert en de` /api/auth/\*\* `endpoints publiek toegankelijk maakt.`  
* `(Testing)`: `Genereer een JUnit 5 testklasse voor de TaskController. Gebruik @MockBean voor de repository en verifieer dat een niet-geauthenticeerde gebruiker een 401 Unauthorized status krijgt bij het aanroepen van GET /api/tasks.`

---

Perfect. De specificaties zijn goedgekeurd. Hier is het volledige, gedetailleerde en productieklare bouwplan, gegenereerd op basis van de architecturale prompt.

Voer deze stappen één voor één uit in uw terminal om uw indrukwekkende "FullStack Kanban Pro" portfolio-applicatie te bouwen.

---

## **Het Canonieke Bouwplan: FullStack Kanban Pro (Productie-Editie)** 

---

### **Fase 1: Fundering en Context**

**3\. De Grondwet (`GEMINI.md`):**

Genereer het `GEMINI.md` bestand. Definieer de volledige stack: Backend (Java 17, Spring Boot, Maven, Spring Security/JWT, JPA, Lombok, Flyway), Database (PostgreSQL), Frontend (React/TypeScript, Material-UI, Zustand, react-beautiful-dnd), Testing (JUnit/Mockito, Jest/RTL), en Deployment (Docker, Docker Compose, GitHub Actions). Specificeer dat alle taken gebruiker-specifiek moeten zijn.

---

### **Fase 2: Backend Ontwikkeling (met Beveiliging & Database Migraties)**

**4\. Backend Initialisatie:**

\! initialiseer een nieuw Spring Boot 3 project in de 'backend' map met Maven, Java 17, en de dependencies: `Web`, `JPA`, `PostgreSQL Driver`, `Spring Security`, `Lombok`, `Flyway Core`, en een `JWT`\-bibliotheek (bv. `io.jsonwebtoken:jjwt-api`).

**5\. Data Model (JPA Entities):**

Genereer de volgende twee JPA Entities in de `com.kanban.model` package:

1. `@backend/src/main/java/com/kanban/model/User.java`: Velden `id`, `username`, `password`.  
2. `@backend/src/main/java/com/kanban/model/Task.java`: Velden `id`, `title`, `description`, `status`. Voeg een `@ManyToOne` relatie toe naar de `User` entity.

**6\. Database Migratie (Flyway):**

@backend/src/main/resources/db/migration/V1\_\_Create\_User\_And\_Task\_Tables.sql Genereer de SQL DDL-code om de `users` en `task` tabellen aan te maken. Zorg voor een foreign key (`user_id`) in de `task` tabel die verwijst naar de `users` tabel.

**7\. Data Access Laag (Repositories):**

Genereer de volgende twee Spring Data JPA Repository interfaces in de `com.kanban.repository` package:

1. `@backend/src/main/java/com/kanban/repository/UserRepository.java`  
2. `@backend/src/main/java/com/kanban/repository/TaskRepository.java` (voeg een methode `findAllByUserId` toe).

**8\. Beveiliging \- JWT Implementatie:**

@backend/src/main/java/com/kanban/security/JwtUtil.java Genereer een `JwtUtil` serviceklasse die methoden bevat voor het genereren, valideren en extraheren van de gebruikersnaam uit een JWT.

**9\. Beveiliging \- Configuratie:**

@backend/src/main/java/com/kanban/security/SecurityConfig.java Genereer de Spring Security configuratieklasse. Configureer het om JWT-authenticatie te gebruiken, de wachtwoord-encoder te definiëren, en de `/api/auth/**` endpoints publiek toegankelijk te maken, terwijl alle andere `/api/**` endpoints authenticatie vereisen.

**10\. Authenticatie API (Controller):**

@backend/src/main/java/com/kanban/controller/AuthController.java Genereer een `@RestController` voor de `/api/auth` mapping. Implementeer `POST /register` en `POST /login` endpoints om gebruikers te registreren en JWT's te genereren.

**11\. Task API (Controller):**

@backend/src/main/java/com/kanban/controller/TaskController.java Genereer de `TaskController` voor `/api/tasks`. Zorg ervoor dat alle methoden de `Principal` (ingelogde gebruiker) gebruiken om te garanderen dat gebruikers alleen hun eigen taken kunnen zien en beheren.

---

### **Fase 3: Frontend Ontwikkeling (met UI, State & Authenticatie)**

**12\. Frontend Initialisatie & Dependencies:**

\! initialiseer een nieuwe React-applicatie in de 'frontend' map met de TypeScript template. Installeer daarna `Material-UI`, `Zustand`, `react-beautiful-dnd`, `axios`, en de bijbehorende types.

**13\. State Management (Zustand Store):**

@frontend/src/store.ts Genereer een Zustand store die de state voor `user`, `tasks`, en het JWT `token` beheert. Implementeer acties voor `login`, `register`, `logout`, en de CRUD-operaties voor taken. Gebruik `axios` om de API-aanroepen te doen, en voeg automatisch de JWT toe aan de headers voor beveiligde requests.

**14\. UI Componenten (Material-UI):**

Genereer de volgende React-componenten in de `frontend/src/components` map, gebruikmakend van Material-UI componenten (`Card`, `Typography`, `Box`):

1. `LoginPage.tsx`  
2. `RegisterPage.tsx`  
3. `TaskCard.tsx` (Draggable)  
4. `KanbanColumn.tsx` (Droppable)

**15\. Hoofdcomponent & Routing:**

@frontend/src/App.tsx Herschrijf de `App` component. Implementeer routing (`react-router-dom`). Beveilig de Kanban-bord route zodat deze alleen toegankelijk is voor ingelogde gebruikers. Implementeer de `DragDropContext` en de `onDragEnd` logica die de store aanroept.

---

### **Fase 4: Kwaliteitsborging (Tests & CI/CD)**

**16\. Backend Unit Tests:**

@backend/src/test/java/com/kanban/controller/TaskControllerTest.java Genereer een JUnit 5 testklasse voor de `TaskController`. Gebruik `@MockBean` en `@WithMockUser` om te testen dat een geauthenticeerde gebruiker zijn taken kan ophalen, en dat een poging zonder authenticatie een 401 Unauthorized status retourneert.

**17\. Frontend Component Tests:**

@frontend/src/components/TaskCard.test.tsx Genereer een testbestand voor de `TaskCard.tsx` component met Jest en React Testing Library. Verifieer dat de component de titel van de taak correct rendert.

**18\. CI/CD Workflow:**

@.github/workflows/build.yml Genereer een basis GitHub Actions workflow. Definieer twee jobs: `build-backend` (voert `mvn clean install` uit) en `test-frontend` (voert `npm test` uit). Zorg ervoor dat beide jobs slagen voordat een pull request gemerged kan worden.

---

### **Fase 5: Integratie en Deployment (Docker)**

**19\. Dockerfiles (Backend & Frontend):**

Genereer de multi-stage Dockerfiles voor zowel de backend (Java/Maven) als de frontend (React/Nginx), inclusief de Nginx proxy-configuratie voor de frontend.

**20\. De Grote Samenvoeging (Docker Compose):**

@docker-compose.yml Genereer het `docker-compose.yml` bestand. Definieer de volgende services:

1. `db`: Een PostgreSQL-service met een volume voor data-persistentie.  
2. `backend`: Bouwt vanuit `/backend` en is afhankelijk van `db`. Geef de database-credentials door via environment variables.  
3. `frontend`: Bouwt vanuit `/frontend` en is afhankelijk van `backend`.

**21\. De Finale Lancering:**

\! bouw alle Docker images, start de volledige applicatie in de achtergrond met Docker Compose, en toon de logs om de opstart te verifiëren.  
