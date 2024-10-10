# LESSION 1

## Target:

- **Aim**: Learn the MERN stack.
- **Approach**: Don’t hurry, understand the concepts and practice them.
- **Note**: This is a challenging project aimed to improve your understanding.

## Initial Setup:

- Created git repo → **Done**
- Created `node_project_notes` → **Done**

---

## Development Models:

### Monolithic vs Microservices

- **Monolith**: One repository contains all the code of the application (frontend, backend, database connections, authentications, notifications, analytics, etc.). All teams work on the same repository.
- **Microservices**: Each service has a specific job. Each service is treated as a small project with its own team. Different parts of the application run as independent services (frontend, backend, notifications, etc.).

### Monolith vs Microservices Comparison:

| Criteria            | Monolith                    | Microservices         |
| ------------------- | --------------------------- | --------------------- |
| **Dev Speed**       | Slower                      | Faster                |
| **Code Repo**       | Single Repository           | Multiple Repositories |
| **Scalability**     | Complex                     | Easier                |
| **Deployment**      | Full application deployment | Service-specific      |
| **Tech Stack**      | Restricted                  | Freedom to choose     |
| **Infra Cost**      | Lower                       | Higher                |
| **Complexity**      | Higher for large projects   | Lower                 |
| **Fault Isolation** | More risk                   | Less risk             |
| **Testing**         | Easier                      | More challenging      |
| **Maintenance**     | Hard to maintain            | Easier to maintain    |
| **Revamps**         | Harder                      | Easier                |
| **Debugging**       | Easier                      | Harder                |
| **Dev Experience**  | 5/10                        | 8/10                  |

---

## Waterfall Model

- **Requirements**: Handled by the Project Manager and UI/UX designers.
  - Gathered by the Project Manager from clients/users.
  - Collaboration with designers for creating the UI/UX.
  - The UI/UX design of the project is prepared at this stage.
- **Design**: Managed by Engineering Manager, Team Lead, and Senior Engineers.
  - Creation of HLD (High-Level Design) and LLD (Low-Level Design).
  - Architecture of the application is determined.
  - Technology stack is selected.
- **Development**: Handled by SDE1 and SDE2 (Development Team).
  - Analyzing the features.
  - Development of features.
  - Unit testing to validate the implementation.
- **Testing**: Managed by the QA Team.
  - Writing end-to-end test cases.
  - Automation testing (optional).
  - Performing feature and end-to-end testing.
- **Deployment**: Managed by the DevOps Engineer/Team or the Dev Team.
  - Deploying the application on servers.
  - Maintaining server operations.
  - In some companies, developers are responsible for deployments, while in others, the DevOps team handles it.
- **Maintenance**: Ongoing process.
  - If a new feature is introduced, the entire cycle repeats.

---

## Tech Stack:

- **Frontend Service**: React.js
- **Backend Service**: Node.js

---

## Notes:

- In startups, developers often handle multiple tasks like development, testing, and deployment.
