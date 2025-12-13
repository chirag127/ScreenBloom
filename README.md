# ScreenBloom-Focus-Boost-Mobile-ReactNative-App
## VISUAL AUTHORITY
[![Build Status](https://img.shields.io/github/actions/workflow/status/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App/ci.yml?branch=main&style=flat-square)](https://github.com/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App/actions/workflows/ci.yml)
[![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App?style=flat-square)](https://codecov.io/gh/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App)
[![License](https://img.shields.io/github/license/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App?style=flat-square)](https://github.com/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App?style=flat-square)](https://github.com/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App/stargazers)

## BLUF
ScreenBloom is a React Native mobile app that blocks distracting apps, tracks saved time, and redirects it toward mindful goals, fostering digital wellness and focus. It leverages AI-driven insights to optimize user productivity and well-being.

## TABLE OF CONTENTS
* [Getting Started](#getting-started)
* [Features](#features)
* [Architecture](#architecture)
* [AI Agent Directives](#ai-agent-directives)
* [Contributing](#contributing)
* [Security](#security)
* [License](#license)

## GETTING STARTED
### Prerequisites
* Node.js (>=14.17.0)
* npm (>=6.14.13)
* React Native CLI (>=2.0.2)

### Installation
bash
npm install


### Setup
bash
npx react-native start


## FEATURES
* App blocking and tracking
* Mindful goal setting and tracking
* AI-driven insights for productivity optimization
* Customizable focus modes

## ARCHITECTURE
The app is built using React Native, with a modular architecture and feature-based structure.
mermaid
graph LR
    A[User] -->|Interacts With|> B(App)
    B -->|Sends Data To|> C(Server)
    C -->|Processes Data With|> D(AI Model)
    D -->|Sends Insights To|> B
    B -->|Displays Insights To|> A


## AI AGENT DIRECTIVES
### Client Configuration
* Base URL: `https://api.cerebras.ai/v1`
* API Key Variable: `CEREBRAS_API_KEY`
* Library: Use the standard `openai` Node.js library.
javascript
const { OpenAI } = require('openai');
const api = new OpenAI({
  base_url: 'https://api.cerebras.ai/v1',
  api_key: process.env.CEREBRAS_API_KEY,
});

### Model Hierarchy (Fallback Cascade)
Always attempt the highest-parameter model first for complex reasoning, cascading down for speed.
* Tier 1 (Frontier Intelligence): `zai-glm-4.6` (357B)
* Tier 2 (Heavy Reasoning): `qwen-3-235b-a22b-instruct-2507` (235B)
* Tier 3 (General Purpose): `gpt-oss-120b` (120B)
* Tier 4 (Balanced Workhorse): `llama-3.3-70b` (70B)
* Tier 5 (Fast Inference): `qwen-3-32b` (32B)
* Tier 6 (Ultra-Fast/Instant): `llama3.1-8b` (8B)

## CONTRIBUTING
Please see [CONTRIBUTING.md](https://github.com/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App/blob/main/CONTRIBUTING.md) for details on how to contribute to this project.

## SECURITY
Please see [SECURITY.md](https://github.com/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App/blob/main/SECURITY.md) for details on how to report security vulnerabilities.

## LICENSE
This project is licensed under the [CC BY-NC 4.0](https://github.com/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App/blob/main/LICENSE) license.

Star ⭐ this Repo if you find it useful! [https://github.com/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App](https://github.com/chirag127/ScreenBloom-Focus-Boost-Mobile-ReactNative-App)