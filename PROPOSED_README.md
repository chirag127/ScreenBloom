# ScreenBloom: Mindfulness App for Social Media Detox

A mobile application designed to combat mindless scrolling by encouraging mindfulness, tracking time saved, allocating that time to personal goals, and offering mini-games for relaxation and focus.

---

## 🚀 Project Overview

ScreenBloom is an innovative mobile solution aimed at reclaiming your time and attention from the grip of social media. By replacing addictive scrolling patterns with mindful engagement, the app empowers users to achieve a healthier digital lifestyle. It meticulously tracks time saved, facilitates goal allocation, and provides engaging mini-games to foster relaxation and sharpen focus.

---

## 🏗️ Architecture & Tech Stack

ScreenBloom is architected with a modern, scalable, and user-centric approach, leveraging a robust technology stack for cross-platform performance and a delightful user experience.

### Core Technologies:

*   **Frontend/Mobile:** React Native (with Expo for streamlined development)
*   **Backend API:** Express.js (Node.js)
*   **Database:** MongoDB (NoSQL for flexible data management)
*   **State Management:** Context API / Zustand
*   **Styling:** Styled-components / Tailwind CSS (for mobile)
*   **Navigation:** React Navigation

### Architectural Principles:

*   **Modular Design:** Components and services are built as independent modules for reusability and maintainability.
*   **Scalability:** Designed to handle a growing user base and feature set.
*   **Performance Optimization:** Focus on efficient data fetching, rendering, and state updates.
*   **User Experience (UX) First:** Intuitive navigation, engaging UI, and seamless interactions are paramount.

### Directory Structure (Illustrative):


ScreenBloom-Mindfulness-App-For-Social-Media-Detox/
├── src/
│   ├── assets/       # Static assets like images, fonts
│   ├── components/   # Reusable UI components
│   ├── constants/    # Application constants
│   ├── contexts/     # React context providers
│   ├── data/         # Mock data, initial data
│   ├── hooks/        # Custom React hooks
│   ├── navigation/   # React Navigation setup
│   ├── screens/
│   │   ├── Auth/
│   │   ├── Home/
│   │   ├── Mindfulness/
│   │   ├── Goals/
│   │   ├── Profile/
│   │   └── ...
│   ├── services/     # API interactions, utility functions
│   ├── store/        # State management (e.g., Zustand)
│   ├── theme/        # Theming and styling configurations
│   └── App.tsx       # Root component
├── api/              # Backend API code (Express.js)
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
├── .gitignore
├── babel.config.js
├── package.json
├── tsconfig.json
└── ...


---

## 🤖 AI AGENT DIRECTIVES

<details>
<summary><strong>AI Agent Directives (Click to Expand)</strong></summary>

This section outlines the core directives for AI agents interacting with the ScreenBloom repository, ensuring alignment with established architectural principles and development standards.

### 1. IDENTITY & PRIME DIRECTIVE
*   **Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
*   **Context:** Current Date is **December 2025**. You are building for the 2026 standard.
*   **Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
*   **Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

### 2. INPUT PROCESSING & COGNITION
*   **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    *   **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)**.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate APIs.
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    *   **Validation:** Use `docfork` to verify *every* external API signature.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

### 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
*   **PRIMARY SCENARIO: MOBILE / CROSS-PLATFORM (React Native)**
    *   **Stack:** This project leverages **React Native** with **Expo** for streamlined development, targeting iOS and Android. Key tools include **TypeScript 6.x** (for robust type safety), **React Navigation** for fluid navigation, and **Zustand/Context API** for efficient state management. For styling, **Tailwind CSS for React Native** provides a utility-first approach.
    *   **Architecture:** Adheres to a **Modular Monolith** pattern for the mobile application, ensuring clear separation of concerns within the frontend. The backend API follows a **Microservices** or **Modular Monolith** approach as appropriate, with clear API contracts.
    *   **Testing:** **Vitest** (for unit and integration tests) and **Detox** (for end-to-end testing on simulators/devices).
*   **SECONDARY SCENARIO: WEB / APP / EXTENSION (TypeScript) - *Not applicable for this project's primary function. Reference only for potential future web-based extensions.***
    *   **Stack:** TypeScript 6.x (Strict), Vite 7 (Rolldown), Tauri v2.x (Native), WXT (Extensions).
    *   **State:** Signals (Standardized).

### 4. PRODUCTIVITY & EFFICIENCY PROTOCOLS
*   **NAMING CONVENTION (STAR VELOCITY ENGINE):**
    *   **Formula:** `<Product-Name>-<Primary-Function>-<Platform>-<Type>`
    *   **Format:** `Title-Case-With-Hyphens` (e.g., `ScreenBloom-Mindfulness-App-For-Social-Media-Detox`)
    *   **Rules:** 3 to 10 words. MUST include high-volume terms. NO numbers, emojis, underscores, or generic words without qualifiers.
*   **DEVELOPMENT STANDARDS:**
    *   **Principles:** SOLID, DRY, YAGNI.
    *   **Linting/Formatting:** **Ruff** for Python, **Biome** for TypeScript/JavaScript, **ESLint/Prettier** as fallbacks.
    *   **Testing:** **Pytest** for Python, **Vitest** for JS/TS, **Detox** for React Native E2E.
*   **CONTINUOUS INTEGRATION/CONTINUOUS DEPLOYMENT (CI/CD):**
    *   **Platform:** GitHub Actions.
    *   **Workflow:** Trigger on `push` and `pull_request`. Jobs include linting, testing, building, and deployment.
    *   **Environment:** Staging and Production environments managed via GitHub Environments.

### 5. SECURITY & COMPLIANCE MANDATES
*   **LICENSE:** CC BY-NC 4.0 (Creative Commons Attribution-NonCommercial 4.0 International).
*   **SECURITY.md:** MANDATORY. Outlines reporting procedures and security vulnerabilities.
*   **CODE OF CONDUCT:** Contributor Covenant Code of Conduct.
*   **DEPENDABOT:** Enabled for automatic dependency updates.

### 6. CONTRIBUTION GUIDELINES
*   **CONTRIBUTING.md:** MANDATORY. Details how to contribute, branching strategy (e.g., Gitflow), and PR process.
*   **ISSUE_TEMPLATE:** Standardized templates for Bug Reports and Feature Requests.
*   **PULL_REQUEST_TEMPLATE:** Pre-filled PR template to ensure necessary information is provided.

### 7. RETIRED PRODUCT PROTOCOL (ARCHIVAL STANDARD)
*   **DIGNIFIED RETIREMENT:** Archived repositories are "Retired Products." They **MUST** maintain professional metadata (Name, Description, Topics) and comprehensive documentation, even when no longer actively developed.
*   **MAINTENANCE:** Critical security patches may be considered, but feature development ceases.

---

## 🔧 Development Setup

Follow these steps to set up the ScreenBloom project locally.

### Prerequisites

*   Node.js (v18.x or later)
*   npm or Yarn
*   Expo CLI (`npm install -g expo-cli`)
*   MongoDB (local installation or cloud instance)

### Backend Setup

1.  Navigate to the backend directory:
    bash
    cd api
    
2.  Install dependencies:
    bash
    npm install
    
3.  Configure environment variables (e.g., `.env` file for MongoDB connection string):
    
    MONGO_URI=mongodb://localhost:27017/screenbloom
    PORT=3000
    # Add other necessary environment variables
    
4.  Start the backend server:
    bash
    npm start
    

### Frontend (Mobile App) Setup

1.  Navigate to the root project directory.
2.  Install dependencies:
    bash
    npm install
    
3.  Start the Expo development server:
    bash
    npx expo start
    
4.  Scan the QR code using the Expo Go app on your iOS or Android device, or run on a simulator:
    *   **iOS Simulator:** Press `i` in the terminal.
    *   **Android Emulator:** Press `a` in the terminal.

---

## 📜 Scripts

Run the following commands from the root of the repository:

| Script              | Description                                                                 |
| :------------------ | :-------------------------------------------------------------------------- |
| `npm install`       | Installs dependencies for the mobile app.                                   |
| `npm run dev:mobile`| Starts the Expo development server for the mobile app.                      |
| `npm run dev:api`   | Starts the Express.js backend API server.                                   |
| `npm run lint`      | Lints the mobile app code using ESLint/Prettier.                            |
| `npm test`          | Runs unit and integration tests for the mobile app using Vitest.            |
| `npm run e2e`       | Runs end-to-end tests using Detox (requires Detox setup).                   |
| `npm run clean`     | Cleans build artifacts and cache for the mobile app.                      |

---

## ⭐ Contributing

Contributions are welcome! Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines on how to submit pull requests and report issues.

---

## 🛡️ License

This project is licensed under the **CC BY-NC 4.0** license. See the [LICENSE](LICENSE) file for more details.

---

## 🤝 Community

Join our community to share feedback, get support, and stay updated!

*   **GitHub Issues:** [Report Bugs/Feature Requests](https://github.com/chirag127/ScreenBloom-Mindfulness-App-For-Social-Media-Detox/issues)
*   **Discussions:** [Community Forum](https://github.com/chirag127/ScreenBloom-Mindfulness-App-For-Social-Media-Detox/discussions)

---

## ✨ Social Proof

If you find ScreenBloom useful, please consider starring this repository on GitHub! ⭐

[<img src="https://img.shields.io/github/stars/chirag127/ScreenBloom-Mindfulness-App-For-Social-Media-Detox?color=0077B5&style=flat-square" alt="GitHub Stars">](https://github.com/chirag127/ScreenBloom-Mindfulness-App-For-Social-Media-Detox/stargazers)
