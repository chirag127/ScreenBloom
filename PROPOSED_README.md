# ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App

![ScreenBloom Banner](https://raw.githubusercontent.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/main/.github/assets/banner.png)

<p align="center">
  <a href="https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/actions/workflows/ci.yml">
    <img src="https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/actions/workflows/ci.yml/badge.svg" alt="Build Status" style="max-width: 100%;" />
  </a>
  <a href="https://codecov.io/gh/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/branch/main">
    <img src="https://codecov.io/gh/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/branch/main/graph/badge.svg?token=YOUR_CODECOV_TOKEN" alt="Code Coverage" style="max-width: 100%;" />
  </a>
  <img src="https://img.shields.io/badge/Tech%20Stack-React%20Native%20%7C%20Node.js%20%7C%20MongoDB-blueviolet?style=flat-square" alt="Tech Stack" style="max-width: 100%;" />
  <img src="https://img.shields.io/badge/Lint%2FFormat-ESLint%20%7C%20Prettier-green?style=flat-square" alt="Lint/Format" style="max-width: 100%;" />
  <img src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey?style=flat-square" alt="License" style="max-width: 100%;" />
  <a href="https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/stargazers">
    <img src="https://img.shields.io/github/stars/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App?style=flat-square&color=orange" alt="GitHub Stars" style="max-width: 100%;" />
  </a>
</p>

<p align="center">
  ⭐ Star this Repo! ⭐
</p>

## 🚀 Blazing Fast Launch

ScreenBloom is a full-stack digital wellness mobile application engineered to combat social media addiction and promote mindful living. It empowers users to regain control over their digital habits by intelligently blocking distracting apps, tracking time saved, and guiding the reallocation of that time towards personal growth and meaningful goals.

## 🗺️ Architectural Blueprint

ScreenBloom's architecture is meticulously designed for scalability, maintainability, and clear separation of concerns, ensuring a robust and responsive user experience. The frontend, built with React Native and Expo, communicates with a Node.js/Express.js backend, which interacts with a MongoDB database.

mermaid
graph TD
    A[Mobile App - React Native / Expo] -->|REST API| B(Backend API - Node.js / Express.js)
    B -->|Database Operations| C(MongoDB Database)
    A -->|App Blocking/Usage Data| D[OS-Level Integrations]
    D -->|Data Sync| B
    B -->|User Authentication| E(Authentication Service - JWT)
    B -->|Notification Service| F(Push Notifications)


## 📖 Table of Contents

*   [🚀 Blazing Fast Launch](#-blazing-fast-launch)
*   [🗺️ Architectural Blueprint](#️-architectural-blueprint)
*   [📖 Table of Contents](#-table-of-contents)
*   [🤖 AI Agent Directives](#-ai-agent-directives)
*   [📦 Installation & Setup](#-installation--setup)
*   [▶️ Running the Application](#️-running-the-application)
*   [📜 Available Scripts](#-available-scripts)
*   [✨ Core Principles](#-core-principles)
*   [🤝 Contributing](#-contributing)
*   [🛡️ Security](#️-security)
*   [📄 License](#-license)

## 🤖 AI Agent Directives

<details>
<summary>Click to reveal AI Agent Directives</summary>

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
**Directives:** Detect the project type and apply the corresponding **Apex Toolchain**.

*   **PRIMARY SCENARIO: MOBILE / WEB / APP (JavaScript/TypeScript)**
    *   **Stack:** This project leverages **JavaScript (ESNext)** with **React Native** and **Expo** for the mobile frontend. The backend is powered by **Node.js** with **Express.js** for robust API development, and **MongoDB** as the persistent NoSQL data store.
    *   **Architecture:** The frontend adheres to a **Component-Based Architecture** and patterns like **MVVM (Model-View-ViewModel)**, ensuring reusability, modularity, and clear state management. The backend follows a **Hexagonal Architecture (Ports & Adapters)**, effectively isolating domain logic from external concerns such as database interactions, API endpoints, and third-party services.
    *   **State Management:** Utilizes modern React ecosystem tools like **React Context API**, **Redux Toolkit**, or **Zustand** for predictable and scalable frontend state management.
    *   **Linting & Formatting:** Enforced with **ESLint** (configured specifically for React Native, Node.js, and potential TypeScript additions) and **Prettier** for automated, consistent code style across the entire codebase.
    *   **Testing:** **Jest** is the primary framework for comprehensive unit and integration tests across both frontend components and backend API logic. **Detox** is integrated for robust end-to-end (E2E) mobile testing, simulating real user interactions.
    *   **Database:** **MongoDB** for flexible, document-oriented data storage, managed with **Mongoose ODM (Object Data Modeling)** for schema definition and simplified interaction within the Node.js environment.
    *   **API:** Implements a **RESTful API** using **Express.js**, following best practices for resource management, clear endpoint design, and secure user authentication (e.g., JWT).
    *   **CI/CD:** Automated workflows powered by **GitHub Actions** for continuous integration and deployment, ensuring code quality and rapid delivery.

</details>

## 📦 Installation & Setup

Follow these steps to get ScreenBloom up and running on your local machine.

1.  **Clone the Repository:**
    bash
    git clone https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App.git
    cd ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App
    

2.  **Backend Setup (Node.js/Express.js):**
    bash
    cd backend
    npm install
    # Create environment file from example
    cp .env.example .env
    # Edit .env and add your MongoDB connection URI and JWT secret key.
    # Example: MONGODB_URI="mongodb://localhost:27017/screenbloom_db" 
    #          JWT_SECRET="supersecretkey"
    

3.  **Frontend Setup (React Native/Expo):**
    bash
    cd ../frontend
    npm install
    # If needed for native modules, run expo prebuild. 
    # This is typically only required if you modify native code or add certain libraries.
    # expo prebuild
    

## ▶️ Running the Application

Ensure both the backend and frontend services are started.

1.  **Start the Backend API:**
    bash
    cd backend
    npm run dev
    
    The backend server should start on `http://localhost:5000` (or your configured port).

2.  **Start the Frontend Mobile App:**
    bash
    cd ../frontend
    npm start
    
    This will open the Expo Dev Tools in your browser. You can then:
    *   Scan the QR code with your phone using the Expo Go app.
    *   Run on an Android emulator or iOS simulator.
    *   Run directly in a web browser (for development convenience).

## 📜 Available Scripts

### Backend (`./backend`)

*   `npm run dev`: Starts the backend server in development mode with nodemon.
*   `npm start`: Starts the backend server in production mode.
*   `npm test`: Runs backend unit and integration tests with Jest.
*   `npm run lint`: Runs ESLint on backend code.
*   `npm run format`: Formats backend code using Prettier.

### Frontend (`./frontend`)

*   `npm start`: Starts the Expo development server.
*   `npm test`: Runs frontend unit and component tests with Jest.
*   `npm run lint`: Runs ESLint on frontend code.
*   `npm run format`: Formats frontend code using Prettier.
*   `npm run e2e`: Runs end-to-end tests with Detox (requires additional setup).

## ✨ Core Principles

This project is built upon a foundation of robust software engineering principles:

*   **SOLID Principles:** Adhering to Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.
*   **DRY (Don't Repeat Yourself):** Promoting reusable code and preventing redundancy across the application.
*   **YAGNI (You Aren't Gonna Need It):** Focusing on immediate needs and avoiding premature optimization or complexity.
*   **Component-Based Design:** For the frontend, emphasizing modular, reusable, and self-contained UI components.
*   **Separation of Concerns:** Clearly delineating responsibilities between different parts of the application (e.g., UI, business logic, data access).

## 🤝 Contributing

We welcome contributions to enhance ScreenBloom! Please refer to our [CONTRIBUTING.md](https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/blob/main/.github/CONTRIBUTING.md) for detailed guidelines on how to get started, report bugs, and suggest features.

## 🛡️ Security

Security is a top priority for ScreenBloom. We follow industry best practices for secure development and encourage responsible disclosure of vulnerabilities. Please review our [SECURITY.md](https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/blob/main/.github/SECURITY.md) to understand our security policies.

## 📄 License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International Public License. See the [LICENSE](https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/blob/main/LICENSE) file for details.
