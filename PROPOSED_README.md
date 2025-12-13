# ScreenBloom-Focus-Boost-Mobile-ReactNative-App
## VISUAL AUTHORITY
[![Build Status](https://img.shields.io/github/actions/workflow/status/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App/ci.yml?branch=main&style=flat-square)](https://github.com/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App/actions/workflows/ci.yml)
[![Codecov](https://img.shields.io/codecov/c/gh/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App?style=flat-square)](https://codecov.io/gh/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App)
[![License](https://img.shields.io/github/license/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App?style=flat-square)](https://github.com/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App?style=flat-square)](https://github.com/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App)

## BLUF
ScreenBloom is a React Native mobile app that blocks distracting apps, tracks saved time, and redirects it toward mindful goals, fostering digital wellness and focus.

## ARCHITECTURE
mermaid
graph LR;
    A[React Native] -->|uses|> B[Expo]
    B -->|manages|> C[Mobile Devices]
    C -->|sends data to|> D[MongoDB]
    D -->|stores|> E[User Data]


## TABLE OF CONTENTS
- [Getting Started](#getting-started)
- [AI Agent Directives](#ai-agent-directives)
- [Development Standards](#development-standards)
- [Contributing](#contributing)
- [License](#license)

## GETTING STARTED
bash
npm install
npm run start


## AI AGENT DIRECTIVES
<details>
<summary>View AI Agent Directives</summary>
ScreenBloom utilizes Cerebras Inference via the OpenAI SDK for AI operations.
* **Client Configuration:**
    + **Base URL:** `https://api.cerebras.ai/v1`
    + **API Key Variable:** `CEREBRAS_API_KEY`
    + **Library:** `openai` Python/Node.js library
* **Model Hierarchy (Fallback Cascade):**
    + **Tier 1 (Frontier Intelligence):** `zai-glm-4.6` (357B)
    + **Tier 2 (Heavy Reasoning):** `qwen-3-235b-a22b-instruct-2507` (235B)
    + **Tier 3 (General Purpose):** `gpt-oss-120b` (120B)
    + **Tier 4 (Balanced Workhorse):** `llama-3.3-70b` (70B)
    + **Tier 5 (Fast Inference):** `qwen-3-32b` (32B)
    + **Tier 6 (Ultra-Fast/Instant):** `llama3.1-8b` (8B)
</details>

## DEVELOPMENT STANDARDS
* **Setup Commands:** `git clone` -> `npm install`
* **Scripts Table:**
| Script | Description |
| --- | --- |
| `start` | Starts the development server |
| `test` | Runs the tests |
| `build` | Builds the app for production |
* **Principles:** SOLID, DRY, YAGNI

## CONTRIBUTING
See [CONTRIBUTING.md](https://github.com/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App/blob/main/CONTRIBUTING.md) for contributing guidelines.

## LICENSE
This project is licensed under the [CC BY-NC 4.0](https://github.com/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App/blob/main/LICENSE) license.
