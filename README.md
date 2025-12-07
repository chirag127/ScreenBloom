# ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App

![ScreenBloom Hero Banner](https://raw.githubusercontent.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/main/.github/assets/hero-banner.png)
_A conceptual hero banner. Replace with actual project branding._

[![Build Status](https://img.shields.io/github/actions/workflow/status/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/ci.yml?branch=main&style=flat-square)](https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/actions/workflows/ci.yml)
[![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App?style=flat-square)](https://codecov.io/gh/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20Native%20%7C%20Node.js%20%7C%20MongoDB-61DAFB?style=flat-square&logo=react)](https://reactnative.dev/)
[![Linting](https://img.shields.io/badge/Linted%20with-ESLint-4B32C3?style=flat-square&logo=eslint)](https://eslint.org/)
[![Formatting](https://img.shields.io/badge/Formatted%20with-Prettier-F7B93E?style=flat-square&logo=prettier)](https://prettier.io/)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-blue.svg?style=flat-square)](https://creativecommons.org/licenses/by-nc/4.0/)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App?style=flat-square&label=Stars&logo=github)](https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/stargazers)

--- 

### Star ⭐ this Repo!
If you find ScreenBloom valuable, please consider giving it a star! Your support helps us grow and improve.

--- 

## 📝 Overview
ScreenBloom is a full-stack mobile application designed to empower users in their digital wellness journey, combating social media addiction by intelligently blocking distracting applications and reallocating saved time to meaningful personal growth goals. It provides a robust platform for tracking digital habits, encouraging mindfulness, and fostering a healthier relationship with technology.

## 🏗️ Architecture
This project employs a classic MERN (MongoDB, Express.js, React Native, Node.js) stack with a clear separation between the mobile frontend and the backend API.

mermaid
graph TD
    User -->|Mobile App (React Native/Expo)| Client
    Client --API Calls (RESTful)-->|Backend (Node.js/Express)| Server
    Server --Data Storage/Retrieval-->|Database (MongoDB)| DB
    DB --User Data, App Block Lists, Goals--> Data

    subgraph Mobile App (Client)
        C1[UI Components]
        C2[State Management]
        C3[Local Storage]
    end

    subgraph API Server (Backend)
        S1[Authentication Module]
        S2[App Blocking Logic]
        S3[Goal Tracking Service]
        S4[User Data Management]
    end

    subgraph Database (MongoDB)
        D1[Users Collection]
        D2[AppBlockRules Collection]
        D3[Goals Collection]
        D4[UsageStatistics Collection]
    end

    Client --> C1
    C1 --> C2
    Client --> C3
    Server --> S1 & S2 & S3 & S4
    DB --> D1 & D2 & D3 & D4


## 📚 Table of Contents
1.  [Overview](#-overview)
2.  [Architecture](#%EF%B8%8F-architecture)
3.  [AI Agent Directives](#-ai-agent-directives)
4.  [Quick Start](#-quick-start)
5.  [Available Scripts](#-available-scripts)
6.  [Guiding Principles](#-guiding-principles)
7.  [Contributing](#-contributing)
8.  [License](#-license)

## 🤖 AI Agent Directives
<details>
<summary>Click to view critical directives for AI Agents</summary>

# SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

## 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

## 2. INPUT PROCESSING & COGNITION
*   **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    *   **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)**.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate APIs.
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    *   **Validation:** Use `docfork` to verify *every* external API signature.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

---

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** Detect the project type and apply the corresponding **Apex Toolchain**. This repository, `ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App`, is a full-stack mobile application.

*   **PRIMARY SCENARIO: MOBILE / WEB / APP (JavaScript/TypeScript)**
    *   **Stack:** This project leverages **React Native with Expo** for the mobile frontend, **Node.js with Express.js** for the backend API, and **MongoDB** for persistent data storage. Key tools include **ESLint** (for linting), **Prettier** (for formatting), **Jest** and **React Testing Library** (for unit/integration testing on the frontend), and **Mocha/Chai** (for backend testing).
    *   **Architecture:** Adheres to a **Modular Monolith** pattern for the backend, with clear separation of concerns (e.g., authentication, user management, app blocking logic). The frontend follows a **component-based architecture** with a focus on reusability and maintainability, potentially leveraging **Feature-Sliced Design (FSD)** principles for larger modules where applicable.
    *   **API Design:** RESTful API principles are strictly followed for server-client communication, ensuring statelessness, cacheability, and a uniform interface.
    *   **Database:** MongoDB is utilized for its flexibility and scalability, with Mongoose ORM for schema definition and interaction.

*   **SECONDARY SCENARIO A: SYSTEMS / PERFORMANCE (Low Level) - *Not applicable for this project's primary function. Reference only.***
    *   **Stack:** Rust (Cargo) or Go (Modules).
    *   **Lint:** Clippy / GolangCI-Lint.
    *   **Architecture:** Hexagonal Architecture (Ports & Adapters).

*   **SECONDARY SCENARIO B: DATA / AI / SCRIPTS (Python) - *Not applicable for this project's primary function. Reference only.***
    *   **Stack:** uv (Manager), Ruff (Linter), Pytest (Test).
    *   **Architecture:** Modular Monolith or Microservices.
    *   **AI Integration:** Deeply integrated with **Google Gemini API** (`gemini-3-pro` by default) for intelligent batch-processing and decision-making where applicable. Prioritize modular design, clear API contracts, and robust error handling for all AI model interactions.

---

## 4. ARCHITECTURAL PRINCIPLES & GOVERNANCE
*   **MODULARITY:** All components, modules, and services must be highly cohesive and loosely coupled.
    *   **Frontend:** Emphasize component reusability, clear state management (e.g., React Context API, Zustand), and separation of UI from business logic.
    *   **Backend:** Implement distinct layers for routing, controllers, services, and data access. Use dependency injection where appropriate.
*   **SCALABILITY:** Design for horizontal scaling on both frontend and backend. Consider load balancing for server instances and efficient database indexing for MongoDB.
*   **SECURITY FIRST:**
    *   **OWASP Top 10:** Adherence to all OWASP security best practices (e.g., input validation, authentication/authorization, secure configuration, dependency management).
    *   **Data Encryption:** Sensitive data at rest (MongoDB) and in transit (HTTPS/SSL/TLS) must be encrypted.
    *   **Authentication/Authorization:** Implement JWT-based authentication for the API and robust role-based access control.
*   **OBSERVABILITY:** Integrate logging, monitoring, and tracing capabilities from the outset. Use tools like Sentry for error tracking, Prometheus/Grafana for metrics.
*   **PERFORMANCE:** Optimize API response times, minimize bundle sizes for the mobile app, and ensure efficient database queries.
*   **RELIABILITY:** Implement robust error handling, retry mechanisms, and graceful degradation strategies.

---

## 5. DEVELOPMENT WORKFLOW & STANDARDS
*   **VERSION CONTROL:** Git Flow or GitHub Flow for branching strategy. Semantic Versioning for releases.
*   **CODE REVIEWS:** Mandatory for all pull requests. Focus on quality, maintainability, security, and adherence to architectural principles.
*   **AUTOMATED TESTING:**
    *   **Unit Tests:** Jest/React Testing Library (frontend), Mocha/Chai (backend) for isolated component/function testing.
    *   **Integration Tests:** Verify interactions between modules/services.
    *   **End-to-End (E2E) Tests:** Detox or Playwright for critical user flows on the mobile app.
*   **CI/CD:** Automated pipelines for build, test, lint, and deployment (e.g., GitHub Actions, Expo EAS).
*   **DOCUMENTATION:** Comprehensive documentation for API endpoints, architecture decisions, setup guides, and contributing guidelines.
*   **DEPENDENCY MANAGEMENT:** Regularly audit and update dependencies to mitigate security vulnerabilities and leverage latest features. Utilize `npm audit` or `yarn audit`.
*   **LINTING & FORMATTING:** Enforce consistent code style using **ESLint** and **Prettier** with pre-commit hooks (e.g., Husky, lint-staged).

---

## 6. VERIFICATION COMMANDS
To ensure the system is operational and compliant:

*   **Run All Tests:**
    bash
    # From client directory
    npm test

    # From server directory
    npm test
    
*   **Run Linting & Formatting Checks:**
    bash
    # From client directory
    npm run lint
    npm run format # (if format script exists)

    # From server directory
    npm run lint
    npm run format # (if format script exists)
    
*   **Build the Mobile App (for production readiness):**
    bash
    # From client directory (requires Expo CLI and account setup)
    eas build --platform android --profile production
    eas build --platform ios --profile production
    
*   **Verify API Health:**
    bash
    curl -X GET http://localhost:PORT/api/v1/health # (Replace PORT with actual server port)
    
</details>

## 🚀 Quick Start
To get ScreenBloom up and running, follow these steps:

1.  **Clone the repository:**
    bash
    git clone https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App.git
    cd ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App
    

2.  **Install Frontend Dependencies (Mobile App):**
    bash
    cd client # or appropriate frontend directory
    npm install # or yarn install
    

3.  **Install Backend Dependencies (API Server):**
    bash
    cd server # or appropriate backend directory
    npm install # or yarn install
    

4.  **Configure Environment Variables:**
    *   Create a `.env` file in the `server` directory based on `server/.env.example`.
    *   Create a `.env` file in the `client` directory based on `client/.env.example`.
    *   Example: `MONGODB_URI`, `JWT_SECRET`, `EXPO_PUBLIC_API_URL`.

5.  **Start the Backend Server:**
    bash
    cd server
    npm run dev # or npm start
    

6.  **Start the Frontend Mobile App:**
    bash
    cd client
    npm start # This will open Expo Dev Tools
    
    Scan the QR code with your Expo Go app on your mobile device or run on an emulator.

## 📜 Available Scripts

| Script             | Description                                                                 |
| :----------------- | :-------------------------------------------------------------------------- |
| `npm start` (client) | Starts the Expo development server.                                       |
| `npm test` (client)  | Runs frontend unit/integration tests with Jest.                           |
| `npm lint` (client)  | Runs ESLint and Prettier checks on frontend code.                         |
| `npm start` (server) | Starts the backend Node.js server.                                          |
| `npm run dev` (server) | Starts the backend Node.js server with nodemon for development.             |
| `npm test` (server)  | Runs backend unit/integration tests with Mocha/Chai.                        |
| `npm lint` (server)  | Runs ESLint and Prettier checks on backend code.                          |

## ✨ Guiding Principles
Our development process adheres to industry best practices to ensure maintainability, scalability, and robustness:

*   **SOLID Principles:** Ensuring code is Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.
*   **DRY (Don't Repeat Yourself):** Promoting reusable components and functions to avoid redundancy.
*   **YAGNI (You Aren't Gonna Need It):** Focusing on immediate needs and avoiding premature optimization or feature implementation.
*   **Test-Driven Development (TDD):** Writing tests before code to guide development and ensure comprehensive coverage.
*   **Clean Architecture:** Maintaining clear separation of concerns between UI, business logic, and data layers.

## 🤝 Contributing
We welcome contributions to ScreenBloom! Please see our [CONTRIBUTING.md](.github/CONTRIBUTING.md) for guidelines on how to submit issues, features, or pull requests.

## 📄 License
This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License](LICENSE).
