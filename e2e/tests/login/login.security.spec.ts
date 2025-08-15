import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';
import { selectors } from '@utils/selectors';
import { invalidCredentials, lockedCredentials } from '@utils/credentials';


test.describe('Login Security', () => {
    test('Negative: too many login attempts are rate limited @regression', async ({ page }) => {
        const MAX_ATTEMPTS = 10;
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        const email = invalidCredentials.email;
        const password = invalidCredentials.password;

        await loginPage.login(email, password);

        for (let i = 0; i < MAX_ATTEMPTS; i++) {
            await page.fill(selectors.login.passwordInput, password);
            await page.click(selectors.login.continueButton);
        }

        await expect(page.locator(selectors.login.rateLimitError)).toBeVisible();
    });

    // we need a way to have a fixed locked account for testing
    // test('Negative: locked account shows appropriate message @regression', async ({ page }) => {
    //     const loginPage = new LoginPage(page);
    //     await loginPage.goto();

    //     const email = lockedCredentials.email;
    //     const password = lockedCredentials.password;

    //     await loginPage.login(email, password);
        
    //     await expect(page.locator(selectors.login.promptAlert)).toContainText(/temporarily blocked your account/);
    // });
});