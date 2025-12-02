# ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App

[![Build Status](https://img.shields.io/github/actions/workflow/status/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/ci.yml?style=flat-square)](https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App/actions/workflows/ci.yml)
[![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App?style=flat-square)](https://codecov.io/gh/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App)
[![Language](https://img.shields.io/github/languages/top/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App?style=flat-square&color=E9C46A)](https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App)
[![License](https://img.shields.io/github/license/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App?style=flat-square)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App?style=flat-square&color=FF99C8)](https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App)

### Reclaim Your Focus: A Full-Stack Digital Detox and Mindfulness Platform for Mobile Users.

ScreenBloom is a comprehensive React Native (Expo) application designed to empower users to manage and mitigate social media addiction by implementing application blocking, time-saved quantification, and mindful goal re-allocation.

---

### ⭐ Star ⭐ this Repo

If you find ScreenBloom valuable for achieving digital wellness, please consider starring the repository to support its continued development.

---

## 🏛️ Architecture Overview

ScreenBloom utilizes a modern MERN-adjacent stack optimized for cross-platform mobile performance and robust backend data integrity.

ascii
                          +----------------------+
                          |    Mobile Client     |
                          | (React Native/Expo)  |
                          +----------+----------+
                                     |
                                     | REST API Calls (HTTPS)
                                     v
                          +----------------------+
                          |  Backend API Layer   |
                          | (Node.js / Express.js) |
                          +----------+----------+
                                     |
                                     | Data Access Layer
                                     v
                          +----------------------+
                          |    Data Persistence  |
                          |    (MongoDB Atlas)   |
                          +----------------------+


## 🧭 Table of Contents

1.  [Key Features](#key-features)
2.  [Technology Stack](#technology-stack)
3.  [🤖 AI Agent Directives (Technical Blueprint)](#-ai-agent-directives-technical-blueprint)
4.  [Development & Setup](#development--setup)
5.  [Contribution Guidelines](#contribution-guidelines)
6.  [License](#license)

---

## ✨ Key Features

*   **Application Blocking Engine:** Native-level blocking capabilities via Expo Native Modules (or equivalent bridging) to restrict access to high-distraction applications during focus sessions.
*   **Time Reclamation Tracker:** Accurate measurement of time saved by blocking apps, visualized clearly.
*   **Mindful Goal Re-allocation:** Connects saved time directly to user-defined mindful activities or learning goals.
*   **Backend Persistence:** Secure storage of user profiles, tracking statistics, and configuration via MongoDB.
*   **Cross-Platform Deployment:** Built with Expo for simultaneous deployment to iOS and Android.

## 🛠️ Technology Stack

| Layer | Core Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | React Native (Expo Managed Workflow) | High velocity, native module access, cross-platform deployment. |
| **State Mgmt** | Zustand / Redux Toolkit (TBD) | Predictable, scalable state management for complex mobile flows. |
| **Styling** | Styled Components / NativeWind (TBD) | Component-scoped styling for maintainability. |
| **Backend** | Node.js (Express.js) | High concurrency and non-blocking I/O suitable for API services. |
| **Database** | MongoDB (Atlas) | Flexible schema suitable for user tracking data and rapid iteration. |
| **DevOps** | GitHub Actions | Automated CI/CD pipeline enforcing quality gates. |

## 🤖 AI Agent Directives (Technical Blueprint)

<details>
<summary>Click to expand Apex AI Alignment Directives</summary>

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
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends** specifically related to *React Native Background Task Management* and *Data Privacy Compliance (GDPR/CCPA)*.
    *   **Validation:** Use `docfork` to verify *every* external API signature, especially for native module integrations.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code, prioritizing native module stability over pure JavaScript solutions for critical blocking features.

--- 

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** Detect the project type and apply the corresponding **Apex Toolchain**. This repository, `ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App`, is a JavaScript/React Native mobile application.

*   **PRIMARY SCENARIO: WEB / APP / GUI (Modern Frontend - Mobile)**
    *   **Stack:** **TypeScript** (Strict adherence enforced via ESLint/Biome rules), **Vite 7** (for bundling dependencies), **React Native/Expo** (Targeting SDK 51+).
    *   **Lint/Test:** **Biome** (Linter/Formatter - Speed is paramount) + **Vitest** (Unit Testing) + **Playwright** (E2E Testing on actual mobile emulators/devices via cloud services).
    *   **Architecture:** Strict adherence to **Feature-Sliced Design (FSD)** principles for modularity: `app`, `processes`, `pages`, `widgets`, `shared`, `entities`, `features`.
    *   **Security Focus:** All direct communication between mobile and MongoDB must be strictly proxied through the Node/Express API layer to prevent direct client exposure of database credentials. Ensure all inputs are sanitized on the backend using validation libraries (e.g., Zod).

## 4. VERIFICATION COMMANDS

To ensure Agent compliance with 2026 standards:

1.  **Lint Check:** `npx @biomejs/biome check --apply src/`
2.  **Unit Test Execution:** `npx vitest run --coverage`
3.  **Architecture Review:** Verify FSD compliance structure using directory schema checks.
4.  **Security Audit:** Confirm that no sensitive keys are hardcoded; check `.env` variables against secrets policy.

</details>

## 🚀 Development & Setup

This project requires Node.js (LTS recommended), Yarn/npm, and the Expo CLI installed globally.

1.  **Clone Repository:**
    bash
    git clone https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App.git
    cd ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App
    

2.  **Install Dependencies (Using uv-aligned principles for dependency management):
    **Note:** While this is JS, we simulate dependency efficiency.
    bash
    npm install
    # or yarn install
    

3.  **Configure Environment:**
    Create a `.env` file in the root directory for API keys and MongoDB connection strings.
    
    # .env
    MONGO_URI="<Your-MongoDB-Atlas-Connection-String>"
    JWT_SECRET="<Secure-Random-Secret>"
    

4.  **Start Development Server:**
    bash
    npx expo start
    

### Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `start` | `npx expo start` | Starts the Expo development server. |
| `android` | `npx expo run:android` | Builds and runs the Android native app. |
| `ios` | `npx expo run:ios` | Builds and runs the iOS native app. |
| `lint` | `npx @biomejs/biome check --apply ./src` | Runs the linter/formatter and applies fixes. |
| `test` | `npx vitest run --coverage` | Executes unit tests and generates coverage report. |
| `ci:build` | `npx expo export:web --output-dir dist` | Simulated static build step for CI verification. |

## 🧭 Guiding Principles

We adhere rigorously to core architectural principles:

*   **SOLID:** Especially Dependency Inversion (D) for managing OS/Native interactions.
*   **DRY:** Minimize boilerplate, maximize reusable UI components.
*   **YAGNI:** Implement only what is required for the current feature scope; avoid premature optimization for hypothetical future needs.

## 🤝 Contribution Guidelines

We welcome contributions that enhance stability, performance, or feature parity. Please review the full guidelines in the repository's contributing file.

[CONTRIBUTING.md](.github/CONTRIBUTING.md)

## 🛡️ Security

Security is paramount for a wellness application handling user behavior data. All backend interactions must validate against potential injection vectors, and sensitive keys must reside only in secure environment variables accessed via the Node.js proxy.

See [.github/SECURITY.md](.github/SECURITY.md) for detailed reporting procedures.

## 📜 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License**.

[LICENSE](LICENSE)