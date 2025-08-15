import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';
import { selectors } from '@utils/selectors';
import { invalidCredentials, validCredentials } from '@utils/credentials';

test.describe('Invalid Login Flow', () => {

  test('Negative: wrong password shows friendly error @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(invalidCredentials.email, invalidCredentials.password);

   await expect(page.locator(selectors.login.passwordInputError)).toContainText(/Incorrect username or password|Your email or password is incorrect/);
  });

  test('Negative: required fields validation @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.click(selectors.login.continueButton);
    await expect(loginPage.getEmailInputErrorMessage()).resolves.toContain('Enter an email address');
  });

  test('Negative: email format validation @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.fill(selectors.login.emailInput, 'not-an-email');
    await page.click(selectors.login.continueButton);
    const emailError = await page.locator(selectors.login.emailInputError).isVisible();
    expect(emailError).toBe(true);
     await expect(loginPage.getEmailInputErrorMessage()).resolves.toContain('Enter a valid email');
  });

  test('Negative: Valid email but incorrect password @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(validCredentials.email, invalidCredentials.password);

    await expect(page.locator(selectors.login.passwordInputError)).toContainText(/Incorrect username or password|Your email or password is incorrect/);
  });
});
