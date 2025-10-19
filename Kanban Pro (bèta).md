FullStackKanbanPro

Absoluut. Dit is de prompt. Het is gestructureerd als een **formele opdracht aan een AI-architect**, ontworpen om een uiterst efficiënt en functioneel bouwplan te genereren, perfect afgestemd op de capaciteiten van de Gemini CLI Coding Agent.

---

### **Prompt: Genereer het Canonieke Bouwplan voor de "FullStack Kanban Pro" Portfolio Applicatie**

**U bent een Senior Solutions Architect. Uw taak is het genereren van een *Build Manual* (bouwplan) dat dient als een reeks imperatieve instructies voor een AI-assistent, de Google Gemini CLI Coding Agent. Het doel is om een overtuigende, productieklare full-stack webapplicatie te bouwen die dient als een portfolio-stuk.**

Het bouwplan moet voldoen aan de volgende vier **Kernprincipes van Efficiëntie**:

**Principe 1: De Enige Bron van Waarheid (`GEMINI.md`)** Het plan MOET beginnen met de creatie van een `GEMINI.md` bestand. Dit bestand fungeert als de "grondwet" van het project en definieert de volledige architectuur, technologieën, coderingsstandaarden en mappenstructuur. De agent zal dit bestand bij elke volgende stap als context gebruiken.

**Principe 2: Atomische, Commando-Gedreven Acties (`!` en `@`)** Elke stap in het plan moet een **direct uitvoerbare prompt** zijn. Vage instructies zijn verboden. Gebruik:

* De `!`\-operator voor alle **shell-gerelateerde taken**: projectinitialisatie, dependency management (Maven, NPM), en het uitvoeren van builds.  
* De `@`\-operator voor alle **code-generatie en \-modificatie**: het creëren van klassen, componenten, en het aanpassen van configuratiebestanden.

**Principe 3: De Interactieve Debug-Loop Simulatie** Het plan moet een stap bevatten waarbij de agent een applicatie-onderdeel (bv. de backend) start, en vervolgens een prompt krijgt om een veelvoorkomende runtime-fout (zoals een database-connectiefout) te analyseren en op te lossen op basis van de live log-output. Dit toont geavanceerde, contextbewuste probleemoplossing.

**Principe 4: Logische Decompositie (Opdeling van Taken)** Complexe onderdelen moeten worden opgedeeld in logische, atomaire stappen. De backend wordt bijvoorbeeld gebouwd in de volgorde: Data Model (Entity) → Data Access (Repository) → Business Logic (Service/Controller).

---

### **Project Specificaties: "FullStack Kanban Pro"**

**Functionele Vereisten:**

* Een Kanban-bord met kolommen: "To Do", "In Progress", "Done".  
* CRUD-functionaliteit voor taken (Tasks).  
* Drag-and-drop functionaliteit om taken tussen kolommen te verplaatsen (dit update de status in de backend).

**Technische Stack:**

* **Backend:** Java 17, Spring Boot 3, Maven, Spring Data JPA, REST API.  
* **Database:** H2 (in-memory, voor eenvoudige setup).  
* **Frontend:** ReactJS, TypeScript, met een state management bibliotheek (bv. Zustand of Redux Toolkit) en een drag-and-drop bibliotheek (bv. `react-beautiful-dnd`).  
* **Deployment:** Docker & Docker Compose voor een geïntegreerde, one-command setup.

---

### **Verwachte Output: Het Genereerde Bouwplan**

Genereer een genummerde lijst van **15 tot 20 stappen** die de volledige levenscyclus van het project bestrijken. Elke stap moet een direct kopieerbare prompt zijn voor de Gemini CLI agent.

**Begin het plan met de creatie van de projectmap en het `GEMINI.md`\-bestand. Eindig met het finale `docker-compose up` commando dat de volledige, werkende applicatie start.**

**Voorbeelden van de vereiste stap-formulering:**

* **(Context):** `Genereer het GEMINI.md bestand. Definieer de architectuur: React/TypeScript frontend ('/frontend'), Java/Maven backend ('/backend'). Voeg de drag-and-drop functionaliteit toe als een kernvereiste voor de frontend.`  
* **(Shell):** `! initialiseer een nieuw Spring Boot 3 project in de 'backend' map met Maven, Java 17, en de dependencies: Web, JPA, H2, en Lombok.`  
* **(Code):** `@backend/src/.../Task.java Genereer de JPA Entity 'Task' met velden voor id, title, description, en een String-veld voor de status.`  
* **(Debug):** `! voer de backend uit met Maven. Analyseer nu de log-output. Als er een fout is over de H2 console, genereer dan de correcte 'application.properties' configuratie om deze in te schakelen en pas deze toe.`

Uitstekend. Hier is het gedetailleerde, uitputtende bouwplan. Dit plan is ontworpen om als een reeks directe, onweerlegbare instructies te dienen voor de Gemini CLI Coding Agent.

Voer deze stappen één voor één uit in uw terminal.

---

## **Het Canonieke Bouwplan: FullStack Kanban Pro**

Voer de eerste twee commando's uit in uw terminal:

1. `! maak een map genaamd 'FullStackKanbanPro' en navigeer ernaartoe.`  
2. `gemini` (Hiermee start u de interactieve Gemini CLI-sessie voor alle volgende stappen.)

---

### **Fase 1: Projectfundering en Context**

**3\. De Grondwet (`GEMINI.md`):**

Genereer het `GEMINI.md` bestand. Definieer de architectuur: React/TypeScript frontend in de map `/frontend`, Java 17/Spring Boot/Maven backend in de map `/backend`. Voeg de drag-and-drop functionaliteit toe als een kernvereiste voor de frontend, waarbij de bibliotheek `react-beautiful-dnd` wordt gebruikt. De state management bibliotheek is `Zustand`. De deploymentstrategie is Docker & Docker Compose. Standaarden: Java \- PascalCase voor klassen, Lombok voor boilerplate; React \- Functionele componenten met hooks.

---

### **Fase 2: Backend Ontwikkeling (Java / Spring Boot)**

**4\. Backend Initialisatie:**

\! initialiseer een nieuw Spring Boot 3 project in de 'backend' map met Maven, Java 17, en de volgende dependencies: `Web`, `JPA`, `H2`, en `Lombok`.

**5\. Data Model (JPA Entity):**

@backend/src/main/java/com/kanban/Task.java Genereer de JPA Entity 'Task'. Vereiste velden zijn: `id` (Long, Primary Key, GeneratedValue), `title` (String), `description` (String), en `status` (String, bv. "TODO", "IN\_PROGRESS", "DONE"). Gebruik Lombok's `@Data` annotatie.

**6\. Data Access Laag (Repository):**

@backend/src/main/java/com/kanban/TaskRepository.java Genereer de Spring Data JPA Repository interface, `TaskRepository`, die de `JpaRepository<Task, Long>` interface uitbreidt.

**7\. Business Logic (Controller / API):**

@backend/src/main/java/com/kanban/TaskController.java Genereer de Spring `@RestController` genaamd `TaskController` met de mapping `/api/tasks`. Implementeer de volgende CRUD-eindpunten door de `TaskRepository` te injecteren: `GET /` (haalt alle taken op), `POST /` (maakt een nieuwe taak aan), `PUT /{id}` (werkt een bestaande taak bij, met name de status), en `DELETE /{id}` (verwijdert een taak).

**8\. Backend Debug-Loop Simulatie:**

\! voer de backend uit met Maven's `spring-boot:run` goal in de 'backend' map.

*(Wacht tot de applicatie draait en de logs verschijnen. Voer dan de volgende prompt uit.)*

Analyseer de zojuist gegenereerde log-output. De H2-console is standaard uitgeschakeld. Genereer de correcte `application.properties` configuratie om de H2-console in te schakelen en de in-memory database te activeren, en pas deze toe op het bestand `@backend/src/main/resources/application.properties`.

---

### **Fase 3: Frontend Ontwikkeling (React / TypeScript)**

**9\. Frontend Initialisatie:**

\! initialiseer een nieuwe React-applicatie in de 'frontend' map met de TypeScript template.

**10\. Frontend Dependencies:**

\! navigeer naar de 'frontend' map en installeer de volgende npm-pakketten: `zustand`, `react-beautiful-dnd`, en de bijbehorende types `@types/react-beautiful-dnd`.

**11\. State Management (Zustand):**

@frontend/src/store.ts Genereer een Zustand store. Deze store moet de state `tasks` beheren en functies bevatten om `fetchTasks` (GET), `addTask` (POST), en `updateTaskStatus` (PUT) via de backend API uit te voeren.

**12\. API Service Laag:**

@frontend/src/apiService.ts Creëer een `apiService.ts` bestand dat de `fetch`\-logica voor de CRUD-operaties exporteert, zodat de Zustand-store deze kan aanroepen.

**13\. UI Componenten (Kaart & Kolom):**

Genereer de volgende twee React-componenten:

1. `@frontend/src/components/TaskCard.tsx`: Een component dat een enkele taak weergeeft en `Draggable` is.  
2. `@frontend/src/components/KanbanColumn.tsx`: Een component dat een `Droppable` zone is en een lijst van `TaskCard` componenten rendert.

**14\. Hoofdcomponent (Kanban Board):**

@frontend/src/App.tsx Herschrijf de `App` component om het volledige Kanban-bord te implementeren. Gebruik de Zustand-store om de taken op te halen. Implementeer de `DragDropContext` van `react-beautiful-dnd`. Zorg ervoor dat de `onDragEnd` functie de `updateTaskStatus` actie uit de store aanroept wanneer een taak naar een nieuwe kolom wordt verplaatst.

---

### **Fase 4: Deployment en Integratie (Docker)**

**15\. Backend Dockerisatie:**

@backend/Dockerfile Genereer een efficiënte, multi-stage Dockerfile voor de Java/Maven applicatie. De eerste stage bouwt de JAR, de tweede stage kopieert de JAR naar een slanke JRE-omgeving.

**16\. Frontend Dockerisatie & Proxy:**

@frontend/nginx.conf Genereer een Nginx-configuratiebestand dat de React-app serveert en alle verzoeken naar `/api` doorstuurt naar de backend-service (`proxy_pass http://backend:8080`).

**17\. Frontend Dockerfile (met Nginx):**

@frontend/Dockerfile Genereer een multi-stage Dockerfile voor de React/TypeScript app. Stage 1 bouwt de statische bestanden. Stage 2 kopieert deze bestanden, samen met de `nginx.conf` van stap 16, in een officiële Nginx image.

**18\. De Grote Samenvoeging (Docker Compose):**

@docker-compose.yml Genereer het `docker-compose.yml` bestand in de root van het project. Definieer twee services: `backend` (bouwt vanuit `/backend`, poort `8080`) en `frontend` (bouwt vanuit `/frontend`, poort `80`). Zorg ervoor dat de frontend afhankelijk is van (`depends_on`) de backend.

**19\. De Finale Lancering:**

\! bouw en start de volledige applicatie in de achtergrond met Docker Compose, en toon de logs.  
