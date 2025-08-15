import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';
import { selectors } from '@utils/selectors';
import { validCredentials } from '@utils/credentials';

test.describe('Login Password Reset Flow', () => {
  test('Navigation: “Forgot password” link visible and navigates to reset route @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await page.fill(selectors.login.emailInput, validCredentials.email);
    await page.click(selectors.login.continueButton);
    await expect(page.locator(selectors.login.forgotPasswordLink)).toBeVisible();
    await loginPage.clickForgotPassword();

    await page.fill(selectors.passwordReset.emailInput, validCredentials.email);
    await page.click(selectors.passwordReset.continueButton);
    await expect(page.locator(selectors.passwordReset.successHeader)).toBeVisible();
  });

  test('Resend email button is visible and functional @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await page.fill(selectors.login.emailInput, validCredentials.email);
    await page.click(selectors.login.continueButton);
    await expect(page.locator(selectors.login.forgotPasswordLink)).toBeVisible();
    await loginPage.clickForgotPassword();

    await page.fill(selectors.passwordReset.emailInput, validCredentials.email);
    await page.click(selectors.passwordReset.continueButton);
    await expect(page.locator(selectors.passwordReset.successHeader)).toBeVisible();

    await expect(page.locator(selectors.passwordReset.resendEmailButton)).toBeVisible();
    await page.click(selectors.passwordReset.resendEmailButton);
    await expect(page.locator(selectors.passwordReset.emailInput)).toHaveValue(validCredentials.email);
  });

});
