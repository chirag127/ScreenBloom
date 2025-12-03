# FocusFlow: Digital Wellness Mobile App

Empower your digital well-being with FocusFlow, a React Native mobile application designed to foster mindful technology use. Seamlessly block distracting apps, monitor your screen time, and proactively reallocate your focus towards meaningful goals. Built with a robust full-stack architecture featuring Node.js and MongoDB.

## 🚀 Core Features

*   **App Blocking:** Define custom blocklists to temporarily disable distracting applications.
*   **Time Tracking:** Comprehensive analytics on app usage to promote self-awareness.
*   **Goal Reallocation:** Tools to help users consciously shift focus from passive consumption to active, goal-oriented activities.
*   **Mindful Reminders:** Gentle nudges to encourage breaks and conscious usage.

## 🏗️ Architecture Overview

FocusFlow employs a modern, scalable full-stack architecture:

mermaid
graph TD
    A[React Native (Expo) Mobile App] --> B{Backend API (Node.js/Express)}
    B --> C[MongoDB Database]
    A --> D[Push Notifications]
    B --> D


## 📚 Table of Contents

*   [Features](#features)
*   [Architecture](#architecture)
*   [Getting Started](#getting-started)
*   [Development Setup](#development-setup)
*   [Testing](#testing)
*   [Contributing](#contributing)
*   [License](#license)
*   [AI Agent Directives](#ai-agent-directives)

## ▶️ Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

Ensure you have Node.js, npm/yarn, and Expo CLI installed.

bash
# Install Node.js (if not already installed)
npm install -g node

# Install Expo CLI
npm install -g expo-cli


### Installation

1.  Clone the repo:
    bash
    git clone https://github.com/chirag127/FocusFlow-Digital-Wellness-Mobile-App.git
    cd FocusFlow-Digital-Wellness-Mobile-App
    

2.  Install dependencies for the frontend:
    bash
    yarn install
    # or
    npm install
    

3.  Navigate to the backend directory and install dependencies:
    bash
    cd backend
    yarn install
    # or
    npm install
    

## 🛠️ Development Setup

### Running the App

*   **Frontend:**
    bash
    cd FocusFlow-Digital-Wellness-Mobile-App
    expo start
    
    Scan the QR code with the Expo Go app on your device or run on an emulator.

*   **Backend:**
    bash
    cd backend
    npm run dev
    # or
    yarn dev
    
    Ensure your MongoDB instance is running and configured.

### Environment Variables

Create a `.env` file in the `backend` directory with the following structure:

dotenv
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000


## 🧪 Testing

FocusFlow is committed to high-quality code through comprehensive testing.

### Frontend (React Native / Expo)

Unit and integration tests are managed using Jest and React Native Testing Library.

bash
# From the root directory:
expo test
# or
npx jest


### Backend (Node.js / Express)

End-to-end tests for the API are written using Jest and Supertest.

bash
cd backend
npm run test
# or
yarn test


## 🤝 Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](https://github.com/chirag127/FocusFlow-Digital-Wellness-Mobile-App/blob/main/.github/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the CC BY-NC 4.0 License - see the [LICENSE](https://github.com/chirag127/FocusFlow-Digital-Wellness-Mobile-App/blob/main/LICENSE) file for details.

---

<details>
<summary>🤖 AI Agent Directives</summary>

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
**Directives:** Detect the project type (`package.json` for JS/TS, `pyproject.toml` for Python) and apply the corresponding **Apex Toolchain**.

*   **PRIMARY SCENARIO: WEB / APP / GUI (Modern Frontend / Mobile)**
    *   **Stack:** This project leverages **React Native (Expo)** for cross-platform mobile development. For the backend, **Node.js** with **Express.js** is used, and **MongoDB** serves as the database. State management will adhere to modern React Native patterns, favoring Hooks and Context API, or a lightweight solution if complexity demands.
    *   **Lint/Format:** **Biome** (Speed) is configured for the entire project (frontend and backend) to ensure code consistency and quality.
    *   **Testing:** **Vitest** (Unit/Integration) for frontend components and **Jest** with **Supertest** for backend API endpoints.
    *   **Architecture:** Follows a **Modular Monolith** pattern for the backend, with clear separation of concerns and well-defined API contracts. Frontend adheres to standard React Native project structure, promoting component reusability and maintainability.

*   **SECONDARY SCENARIO B: SYSTEMS / PERFORMANCE (Low Level) - *Not applicable for this project.***
    *   **Stack:** Rust (Cargo) or Go (Modules).
    *   **Lint:** Clippy / GolangCI-Lint.
    *   **Architecture:** Hexagonal Architecture (Ports & Adapters).

*   **SECONDARY SCENARIO C: DATA / AI / SCRIPTS (Python) - *Not applicable for this project.***
    *   **Stack:** uv (Manager), Ruff (Linter), Pytest (Test).
    *   **Architecture:** Modular Monolith or Microservices.

---

## 4. DEVELOPMENT PRINCIPLES
*   **SOLID:** Adhere to **S**ingle Responsibility, **O**pen/Closed, **L**iskov Substitution, **I**nterface Segregation, and **D**ependency Inversion principles in all code.
*   **DRY:** **D**on't **R**epeat **Y**ourself. Abstract common logic into reusable functions, modules, and components.
*   **YAGNI:** **Y**ou **A**in't **G**onna **N**eed It. Build only what is necessary now, avoiding premature optimization or feature creep.
*   **KISS:** **K**eep **I**t **S**uper **S**imple. Prioritize clarity and simplicity in design and implementation.

---

## 5. VERIFICATION COMMANDS

*   **Install All Dependencies:**
    bash
    # Root directory for frontend dependencies
    yarn install
    # Backend dependencies
    cd backend && yarn install
    

*   **Run Linters & Formatters:**
    bash
    # Root directory (for frontend - Expo/React Native)
    npx @biomejs/biome check --apply
    # Backend directory (for Node.js/Express)
    cd backend && npx @biomejs/biome check --apply
    

*   **Run Tests:**
    bash
    # Root directory (for frontend)
    expo test
    # Backend directory
    cd backend && npm run test
    

*   **Build Application:**
    bash
    # For production builds (example for Expo):
    expo build:ios
    expo build:android
    

---

## 6. SECURITY & PRIVACY MANDATE
*   **Data Minimization:** Collect only the data essential for core functionality.
*   **Secure Storage:** Encrypt sensitive user data at rest and in transit.
*   **API Security:** Implement robust authentication (e.g., JWT) and authorization. Sanitize all inputs to prevent injection attacks (e.g., XSS, SQL injection).
*   **Dependency Scanning:** Regularly scan dependencies for known vulnerabilities.
*   **Privacy by Design:** Integrate privacy considerations from the initial design phase.

---

## 7. DEPLOYMENT & SCALABILITY (LATE 2025 STRATEGY)
*   **CI/CD:** Automate build, test, and deployment pipelines using GitHub Actions.
*   **Cloud-Native:** Deploy backend services to scalable cloud platforms (e.g., AWS, GCP, Azure) leveraging containerization (Docker) and orchestration (Kubernetes) where appropriate.
*   **Database Scaling:** Utilize managed MongoDB services (e.g., MongoDB Atlas) for automated scaling, backups, and high availability.
*   **Performance Monitoring:** Implement application performance monitoring (APM) tools to track key metrics and identify bottlenecks.

---

## 8. FUTURE-PROOFING & ADAPTABILITY
*   **Modularity:** Design components and services with clear interfaces to allow for future replacement or extension.
*   **API Versioning:** Implement API versioning for backward compatibility.
*   **Tech Evolution:** Stay abreast of emerging technologies and frameworks, allowing for pragmatic adoption when they mature and prove beneficial.

</details>
