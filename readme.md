# BigHeart App Automated Test Suite

![Cypress Version](https://img.shields.io/badge/cypress-12.17%2B-brightgreen)
![Node Version](https://img.shields.io/badge/node-18%2B-blue)

End-to-end tests for BigHeart web application using Cypress. Validates critical workflows including post lifecycle management.

## Prerequisites

- Node.js v18+
- npm v9+
- Cypress v12.17+
- Chrome/Firefox browser

## Installation

1. Clone repo & install dependencies:

```bash
git clone https://github.com/R080T/bigheart-cypress-test.git
cd bigheart-cypress-test
npm install
```

## Running Tests

Run all tests in headless mode:

```bash
npx cypress run  # Headless mode
npx cypress open # Interactive runner
```

## Configuration

- **Test credentials**: Stored in `cypress.env.json`
- **Base URL**: `https://qa.bigheartapp.org`
- **Viewport**: 1440x900 (desktop resolution)
- **Timeouts**: 10-second global command timeout

## Test Workflow

1. User login
2. Post creation with organization selection
3. Content verification
4. Post deletion

## Key Commands

| Command        | Description                         |
| -------------- | ----------------------------------- |
| `login()`      | Authenticates with email/password   |
| `createPost()` | Creates post with rich text content |
| `deletePost()` | Deletes specified post              |
