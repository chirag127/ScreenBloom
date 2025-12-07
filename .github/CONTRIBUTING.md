# Contribution Guidelines for ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App

As the Apex Technical Authority, we enforce the highest standards of quality, architecture, and maintainability. Contributions to `ScreenBloom` must adhere to FAANG-level quality gates and the **Zero-Defect, High-Velocity, Future-Proof** philosophy.

## 1. Prerequisites and Setup

Before contributing, ensure your local environment meets the defined stack requirements:

*   **Platform:** JavaScript / TypeScript (React Native / Expo)
*   **Dependencies:** Node.js (LTS current), Yarn/npm, Expo CLI.
*   **Architecture:** All new features must align with the **Feature-Sliced Design (FSD)** principles for modularity, even within the React Native context.

Follow these steps to prepare your development environment:

1.  **Fork the Repository:** Create your own fork of `chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App`.
2.  **Clone Locally:**
    bash
    git clone https://github.com/YOUR-USERNAME/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App.git
    cd ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App
    
3.  **Install Dependencies:** We standardize on `npm` for maximum compatibility, managed via `package.json`.
    bash
    npm install
    
4.  **Environment Variables:** Create a `.env` file in the root, mirroring `.env.example`, and populate necessary API keys (e.g., for potential third-party integrations or future AI backend hooks).

## 2. Development Workflow: Quality Gate Enforcement

All contributions must pass automated checks before merging.

### A. Branching Strategy
Use a descriptive feature branch based on the context:
*   `feature/issue-XXXX-brief-description` for new functionality.
*   `fix/issue-XXXX-brief-description` for bug remediation.
*   `chore/maintenance-task` for infrastructure or dependency updates.

### B. Linting and Formatting
We enforce strict code quality using **Biome** for JavaScript/TypeScript/JSON/Markdown files. Formatting is non-negotiable.

bash
# Run linter and formatter checks across the codebase
npm run lint

# Fix all auto-fixable issues (mandatory before committing)
npm run format


### C. Testing
Code must be accompanied by comprehensive tests. We utilize **Vitest** for unit/component testing and **Playwright** for end-to-end scenarios.

*   **Unit Tests (Vitest):** Ensure functional correctness. Aim for **>85% Coverage** on all new logic.
    bash
    npm run test:unit
    
*   **E2E Tests (Playwright):** Validate critical user journeys (e.g., App Blocking activation, time tracking persistence).
    bash
    npm run test:e2e
    

## 3. Submitting a Pull Request (PR)

Follow the **PR Template** (`.github/PULL_REQUEST_TEMPLATE.md`) meticulously.

1.  **Push Your Changes:** Push your feature branch to your fork.
    bash
    git push origin feature/my-new-feature
    
2.  **Create the PR:** Navigate to the main repository and open a Pull Request targeting the `main` branch.
3.  **Description Clarity:** Clearly articulate *what* was changed, *why* it was changed (linking to the corresponding issue), and *how* it affects the architecture (referencing FSD boundaries).
4.  **Verification:** Confirm that the **CI Workflow (`ci.yml`)** has passed *before* requesting review. No PRs targeting failure states will be merged.

## 4. Architectural Principles Adherence

All code must reflect deep respect for software engineering fundamentals:

*   **SOLID:** Especially Single Responsibility and Dependency Inversion.
*   **DRY (Don't Repeat Yourself):** Abstract common patterns aggressively.
*   **YAGNI (You Ain't Gonna Need It):** Avoid speculative generalization. Build only what is immediately necessary.

## 5. Reporting Issues

If you discover a bug or wish to propose a new feature, use the provided issue templates (`.github/ISSUE_TEMPLATE/bug_report.md`) or feature request template.

*   **Security Concerns:** Please read the **SECURITY.md** file for responsible disclosure procedures before public reporting.

--- 

*By contributing to this project, you agree to license your contributions under the terms specified in the **LICENSE** file (CC BY-NC 4.0).* 

[Back to Repository Root](https://github.com/chirag127/ScreenBloom-Digital-Wellness-And-Mindfulness-Mobile-App)