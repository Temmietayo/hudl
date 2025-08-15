# Hudl Login E2E Tests

This project contains UI E2E tests for the login flow of the Hudl application.

## Scope

- UI E2E tests for the login flow only.

## How to run locally

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Install Playwright browsers:**
    ```bash
    npx playwright install --with-deps
    ```
3.  **Set environment variables:**
    Create a `.env` file in the root of the project and add the following variables:
    ```
    BASE_URL=https://www.hudl.com
    CREDENTIALS={"validCredentials":{email: "", password: ""},"lockedCredentials":{}}
    ```
4.  **Run tests:**
    ```bash
    npx playwright test
    ```

## How to run in CI

The tests are automatically run on every push and pull request to the `main` branch via GitHub Actions.

## Environment Variables

- `BASE_URL`: The base URL of the application under test.
- `CREDENTIALS`: A JSON string that contains the credential details

## Selector Policy

- We use `data-test-id` attributes for deterministic selectors.
- Selectors are stored in `e2e/utils/selectors.ts`.
- Some CSS selectors due to `data-test-id` attribute missing for some elements.

## Tag Policy

- `@smoke`: Critical path tests.
- `@regression`: Regression tests.
- `@a11y`: Accessibility tests.

## Flake Policy

- Retries are enabled on CI only (2 retries).
- Local retries are disabled.
- No `waitForTimeout` is used. Synchronization is achieved via user-visible conditions and assertions.
