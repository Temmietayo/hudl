import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';
import { selectors } from '@utils/selectors';
import {validCredentials, invalidCredentials} from '@utils/credentials';

test.describe('Valid Login Flow', () => {
  test('Happy path: valid login lands on dashboard @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(validCredentials.email, validCredentials.password);

    await expect(dashboardPage.isHomePageVisible()).resolves.toBe(true);
  });

  test('Session persistence: “Remember me” survives reload @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(validCredentials.email, validCredentials.password);
    await expect(dashboardPage.isHomePageVisible()).resolves.toBe(true);

    await page.reload();
    await expect(dashboardPage.isHomePageVisible()).resolves.toBe(true);
  });

  test('Navigation: Updating email after attempting login with invalid email @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
     await loginPage.goto();
     const dashboardPage = new DashboardPage(page);

     await loginPage.login(invalidCredentials.email, invalidCredentials.password);
    await page.click(selectors.login.editEmailLink);

    await page.fill(selectors.login.emailInput, validCredentials.email);      
    await page.click(selectors.login.continueButton);
    await page.fill(selectors.login.passwordInput, validCredentials.password);
    await page.click(selectors.login.continueButton);

    await expect(dashboardPage.isHomePageVisible()).resolves.toBe(true);
 });

 test('Navigation: "Password visibility toggle" works', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await page.fill(selectors.login.emailInput, validCredentials.email);
    await page.click(selectors.login.continueButton);
    await page.fill(selectors.login.passwordInput, validCredentials.password);

    const passwordInput = page.locator(selectors.login.passwordInput);
    const toggleButton = page.locator(selectors.login.passwordVisibilityToggle);

    // password is initiallyhidden
    await expect(passwordInput).toHaveAttribute('type', 'password');

    await toggleButton.click();
    // password is visible
    await expect(passwordInput).toHaveAttribute('type', 'text');

    await toggleButton.click();
    // password is hidden again
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });
});