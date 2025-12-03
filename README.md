# FocusFlow: Digital Wellness Mobile App

<div align="center">
  <img src="https://raw.githubusercontent.com/chirag127/FocusFlow-Digital-Wellness-Mobile-App/main/.github/assets/hero_banner.png" alt="FocusFlow Hero Banner" width="800"/>
</div>

<div align="center">

[
![Build Status](https://img.shields.io/github/actions/workflow/status/chirag127/FocusFlow-Digital-Wellness-Mobile-App/ci.yml?branch=main&style=flat-square)
](https://github.com/chirag127/FocusFlow-Digital-Wellness-Mobile-App/actions/workflows/ci.yml)
[
![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/FocusFlow-Digital-Wellness-Mobile-App?style=flat-square)
](https://codecov.io/gh/chirag127/FocusFlow-Digital-Wellness-Mobile-App)
[
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
](https://www.typescriptlang.org/)
[
![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat-square&logo=react&logoColor=black)
](https://reactnative.dev/)
[
![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white)
](https://expo.dev/)
[
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
](https://nodejs.org/)
[
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
](https://www.mongodb.com/)
[
![Lint & Format: Biome](https://img.shields.io/badge/lint_&_format-Biome-60A5FA?style=flat-square&logo=biome&logoColor=white)
](https://biomejs.dev/)
[
![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg?style=flat-square)
](https://creativecommons.org/licenses/by-nc/4.0/)
[
![GitHub Stars](https://img.shields.io/github/stars/chirag127/FocusFlow-Digital-Wellness-Mobile-App?style=flat-square&logo=github)
](https://github.com/chirag127/FocusFlow-Digital-Wellness-Mobile-App/stargazers)

</div>

<div align="center">
  <a href="https://github.com/chirag127/FocusFlow-Digital-Wellness-Mobile-App/stargazers"><strong>Star ⭐ this Repo</strong></a> to support its development!
</div>

---

FocusFlow is a comprehensive digital wellness mobile application designed to help you reclaim your time and attention. By enabling smart app-blocking, detailed time tracking, and mindful goal reallocation, it empowers users to cultivate a healthier relationship with technology.

This full-stack project is built with a modern, scalable architecture using React Native (Expo) for the mobile client and a Node.js (Fastify) backend powered by MongoDB.

## ✨ Key Features

-   **🎯 Customizable App Blocking:** Block distracting apps and websites based on schedules, location, or usage limits.
-   **📊 Insightful Time Tracking:** Understand your digital habits with clear, actionable reports on app usage.
-   **🌱 Mindful Goal Setting:** Reallocate saved time towards meaningful personal and professional goals.
-   **🔔 Smart Notifications:** Receive gentle reminders to take breaks and stay on track with your wellness objectives.
-   **🔒 Privacy-First:** All user data is handled securely, with a commitment to user privacy.
-   **🎨 Clean & Intuitive UI:** A minimalist interface designed to reduce cognitive load and promote focus.

## 🏗️ Architecture Overview

This project utilizes a high-performance monorepo structure managed by **Turborepo** to streamline development, testing, and deployment across the mobile and server applications.

sh
. FocusFlow-Digital-Wellness-Mobile-App/
├── .github/                # GitHub Actions, issue templates, etc.
├── apps/
│   ├── mobile/             # React Native (Expo) app (Feature-Sliced Design)
│   └── server/             # Node.js (Fastify) API (Hexagonal Architecture)
├── packages/
│   ├── api-types/          # Shared TypeScript types for API contracts
│   ├── config/
│   │   ├── biome/          # Shared Biome (lint/format) config
│   │   └── typescript/     # Shared tsconfig.json
│   └── ui/                 # Shared React Native components (Tamagui)
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── package.json
└── turbo.json


## 📚 Table of Contents

1.  [AI Agent Directives](#-ai-agent-directives)
2.  [Getting Started](#-getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
3.  [Available Scripts](#-available-scripts)
4.  [Core Principles](#-core-principles)
5.  [Contributing](#-contributing)
6.  [License](#-license)

## 🤖 AI Agent Directives

<details>
<summary><strong>SYSTEM: APEX TECHNICAL AUTHORITY (DECEMBER 2025 EDITION)</strong></summary>

### 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards.
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

### 2. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** This repository, `FocusFlow-Digital-Wellness-Mobile-App`, is a full-stack mobile application. You must adhere to the following architectural and tooling standards.

*   **PRIMARY SCENARIO: FULL-STACK MOBILE APP (TypeScript)**
    *   **Stack:** TypeScript 6.x (Strict), React Native (Expo SDK 55+), Node.js v22+, Fastify (for API performance), Prisma ORM v6+, MongoDB. The project is managed as a monorepo using Turborepo and pnpm workspaces.
    *   **Architecture:**
        *   **Frontend (Mobile):** Adheres to **Feature-Sliced Design (FSD)** for a highly modular, scalable, and maintainable UI architecture. Code is organized by layers (`app`, `pages`, `widgets`, `features`, `entities`, `shared`).
        *   **Backend (API):** Implements **Hexagonal Architecture (Ports & Adapters)** to decouple business logic (domain) from infrastructure concerns like frameworks (Fastify) and databases (Prisma/MongoDB).
        *   **Monorepo:** Utilizes **Turborepo** for high-performance build caching, task orchestration, and simplified dependency management across the `mobile` and `server` applications.
    *   **State Management:** Employs a **Signals-based** approach (e.g., Jotai with signals or TanStack Signal) for granular reactivity, optimal performance, and avoidance of unnecessary re-renders.
    *   **Testing Protocol:**
        *   **Unit/Integration:** **Vitest** is the standard for both frontend (components, hooks) and backend (services, adapters) testing due to its speed and modern API.
        *   **E2E (Mobile):** **Maestro** is mandated for reliable, script-based end-to-end testing on mobile simulators and devices, ensuring critical user flows are validated before deployment.

*   **TOOLING & FORMATTING:**
    *   **Linting & Formatting:** **Biome** is the single, unified tool for linting, formatting, and import sorting across the entire monorepo. Enforce the rules defined in `packages/config/biome/biome.json`.
    *   **Verification Commands:** Before committing, always run `pnpm lint:check` and `pnpm test` to ensure compliance.

</details>

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v20.x or higher)
-   [pnpm](https://pnpm.io/) (v9.x or higher)
-   [Expo Go](https://expo.dev/go) app on your mobile device or an iOS/Android simulator.
-   A local [MongoDB](https://www.mongodb.com/) instance or a cloud-hosted database (e.g., MongoDB Atlas).

### Installation

1.  **Clone the repository:**
    bash
    git clone https://github.com/chirag127/FocusFlow-Digital-Wellness-Mobile-App.git
    cd FocusFlow-Digital-Wellness-Mobile-App
    

2.  **Install dependencies:**
    bash
    pnpm install
    

3.  **Set up environment variables:**
    -   Create a `.env` file in the `apps/server` directory by copying from `.env.example`.
    -   Fill in the required variables, such as your `DATABASE_URL`.

4.  **Sync the database schema:**
    bash
    pnpm db:push
    

## 💻 Available Scripts

This project uses `pnpm` as its package manager and script runner. All scripts should be run from the root directory.

| Script               | Description                                           |
| -------------------- | ----------------------------------------------------- |
| `pnpm dev`           | Starts both the mobile app and API server concurrently. |
| `pnpm dev:mobile`    | Starts the Expo development server for the mobile app.  |
| `pnpm dev:server`    | Starts the Fastify API server in watch mode.          |
| `pnpm build`         | Builds all applications and packages in the monorepo.   |
| `pnpm lint`          | Lints and formats all files using Biome.              |
| `pnpm lint:check`    | Checks for linting and formatting errors.             |
| `pnpm test`          | Runs all unit and integration tests with Vitest.      |
| `pnpm test:e2e`      | Runs end-to-end tests using Maestro.                  |
| `pnpm db:push`       | Pushes Prisma schema changes to the database.         |
| `pnpm db:studio`     | Opens Prisma Studio to view and manage data.          |

## 🏛️ Core Principles

-   **SOLID:** Code is structured following SOLID principles to ensure it is robust, maintainable, and scalable.
-   **DRY (Don't Repeat Yourself):** Reusable logic is abstracted into shared packages and utilities.
-   **YAGNI (You Ain't Gonna Need It):** Features are implemented pragmatically to meet current requirements without over-engineering for a hypothetical future.

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](https://github.com/chirag127/FocusFlow-Digital-Wellness-Mobile-App/blob/main/.github/CONTRIBUTING.md) file for guidelines on how to submit pull requests.

## 📄 License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](https://github.com/chirag127/FocusFlow-Digital-Wellness-Mobile-App/blob/main/LICENSE). See the `LICENSE` file for more details.