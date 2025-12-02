# ScreenBloom: Digital Wellness & Mindfulness Mobile App

A comprehensive React Native (Expo) mobile application designed to combat social media addiction. ScreenBloom empowers users by blocking distracting applications, meticulously tracking time saved, and facilitating the reallocation of that time towards personal mindfulness goals. Built with a robust full-stack architecture utilizing Node.js and MongoDB for backend services.

---

![Build Status](https://img.shields.io/github/actions/workflow/user/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/ci.yml?style=flat-square)
![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App?style=flat-square)
![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%20Native%2C%20Node.js%2C%20MongoDB-blue?style=flat-square)
![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgray?style=flat-square)
![GitHub Stars](https://img.shields.io/github/stars/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App?style=flat-square)

---

## 🌟 Star ⭐ This Repo!

If you find ScreenBloom valuable, please consider starring this repository to support its development.

---

## 🏛️ Architecture

This project employs a **Modular Monolith** architecture for the backend, ensuring clear separation of concerns while maintaining a unified deployment. The frontend is built using React Native (Expo).

mermaid
graph TD
    A[Mobile App (React Native/Expo)] --> B(API Gateway)
    B --> C{Backend Services (Node.js/Express)}
    C --> D[Database (MongoDB)]
    A -- Authentication --> E(Auth Service)
    E --> C


---

## 📋 Table of Contents

*   [Architecture](#-architecture)
*   [Key Features](#-key-features)
*   [Getting Started](#-getting-started)
*   [Development](#-development)
*   [Testing](#-testing)
*   [Contributing](#-contributing)
*   [License](#-license)
*   [Security](#-security)
*   [🤖 AI Agent Directives](#-ai-agent-directives)

---

## ✨ Key Features

*   **App Blocking:** Temporarily disable access to distracting applications.
*   **Time Tracking:** Monitor how much time is saved from reduced app usage.
*   **Mindful Goal Setting:** Reallocate saved time towards productive or mindful activities (e.g., reading, meditation, exercise).
*   **User Analytics:** Insights into digital wellness habits.
*   **Cross-Platform:** Built with React Native for iOS and Android.

---

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18+ recommended)
*   npm or Yarn
*   Expo Go app (for mobile testing)
*   MongoDB Atlas account (for cloud database)

### Installation

1.  **Clone the repository:**
    bash
    git clone https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App.git
    cd ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App
    

2.  **Install backend dependencies:**
    bash
    cd backend
    npm install # or yarn install
    

3.  **Install frontend dependencies:**
    bash
    cd ../frontend
    npm install # or yarn install
    

4.  **Configure Environment Variables:**
    Create a `.env` file in the `backend` directory with your MongoDB connection string and any API keys.

---

## 🛠️ Development

### Backend

*   **Start the server:**
    bash
    cd backend
    npm run dev # or yarn dev
    

### Frontend

*   **Start the Expo app:**
    bash
    cd frontend
    npx expo start
    
    Then, scan the QR code with the Expo Go app on your device or run in an emulator.

---

## 🧪 Testing

*   **Run backend tests:**
    bash
    cd backend
    npm test # or yarn test
    

*   **Run frontend tests (Vitest):**
    bash
    cd frontend
    npm test # or yarn test
    

---

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](./.github/CONTRIBUTING.md) file for details on how to submit pull requests.

---

## ⚖️ License

This project is licensed under the [CC BY-NC 4.0](./LICENSE) license.

---

## 🛡️ Security

For security-related issues, please refer to our [SECURITY.md](./.github/SECURITY.md) file.

---

## 🤖 AI Agent Directives

<details>
<summary>View Agent Directives</summary>

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
**Directives:** Detect the project type (`package.json` for Node.js/React Native, `pyproject.toml` for Python) and apply the corresponding **Apex Toolchain**.

*   **PRIMARY SCENARIO: WEB / APP / EXTENSION (React Native / Node.js)**
    *   **Stack:** This project utilizes **React Native (Expo)** for the mobile frontend and **Node.js (Express.js)** for the backend. TypeScript is used for type safety where applicable. Core dependencies include modern JavaScript ES2023 features.
    *   **Lint/Format:** **Biome** (for ultra-fast linting and formatting across both frontend and backend JavaScript/TypeScript code).
    *   **Testing:** **Vitest** (for unit and integration testing of both frontend and backend code), **Playwright** (for E2E testing, especially if any web interfaces are involved or for testing API interactions).
    *   **Architecture:** **Modular Monolith** (Backend) for clear separation of concerns, ensuring maintainability and scalability. Feature-Sliced Design principles can be applied to the frontend for better organization.
    *   **Database:** **MongoDB** with Mongoose ODM for robust data modeling and interaction.
    *   **State Management (Frontend):** Utilizing React's Context API or Zustand for efficient global state management.

*   **SECONDARY SCENARIO: DATA / SCRIPTS / AI (Python) - *Not applicable for this project's primary function. Reference only for potential future AI integrations or auxiliary scripts.***
    *   **Stack:** Python 3.10+ with **uv**, **Ruff**, **Pytest**.
    *   **Architecture:** Modular Monolith or Microservices.

---

## 4. APEX DEVELOPMENT PRINCIPLES
*   **SOLID:** Adhere to Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles.
*   **DRY:** Don't Repeat Yourself. Abstract common logic into reusable modules and functions.
*   **YAGNI:** You Ain't Gonna Need It. Implement only necessary features to avoid over-engineering.
*   **KISS:** Keep It Simple, Stupid. Favor straightforward solutions.
*   **Zero-Defect:** Rigorous testing, code reviews, and automated quality gates.
*   **High-Velocity:** Streamlined CI/CD, efficient development workflows, and clear documentation.
*   **Future-Proof:** Adopt modern standards, modular design, and clear extensibility points.

---

## 5. MANDATORY VERIFICATION COMMANDS
*   **Global Dependencies Check:**
    bash
    npm list -g --depth=0 # Verify Node.js, npm/yarn, Expo CLI installations
    
*   **Project Setup Verification:**
    bash
    cd "ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App"
    # Verify backend installation
    cd backend
    npm install
    npm run test # Run backend unit tests
    # Verify frontend installation
    cd ../frontend
    npm install
    npm test # Run frontend unit tests
    
*   **Code Quality Gates:**
    bash
    # Run Biome linter and formatter across the entire project
    cd "ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App"
    npx @biomejs/biome lint --apply --files-ignore-unknown=true
    npx @biomejs/biome format --write --files-ignore-unknown=true
    
*   **E2E Testing (if applicable/configured):**
    bash
    # Example for Playwright (assuming setup)
    cd "ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App"
    cd frontend # Or wherever playwright is configured
    npx playwright test
    

---

## 6. DEPLOYMENT & CI/CD
*   **CI/CD Pipeline:** Orchestrated via GitHub Actions (`.github/workflows/ci.yml`).
*   **Deployment Strategy:** Continuous Deployment to platforms like Heroku, AWS Elastic Beanstalk, or Vercel (for backend) and App Store/Google Play (for frontend) via Expo Application Services (EAS) build and submit.
*   **Environments:** Managed through distinct `.env` files for Development, Staging, and Production.

</details>
