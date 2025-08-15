import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';
import { selectors } from '@utils/selectors';
import { invalidCredentials } from '@utils/credentials';

test.describe('Login Accessibility Flow', () => {

  test('Accessibility smoke: labels or aria attributes present; tab order email → password @a11y', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const emailInput = page.locator(selectors.login.emailInput);
    const passwordInput = page.locator(selectors.login.passwordInput);

    await expect(emailInput).toBeFocused();
      await expect(
      await emailInput.getAttribute('aria-label') || await emailInput.getAttribute('aria-labelledby')
    ).not.toBeNull();

    await page.fill(selectors.login.emailInput, invalidCredentials.email);
    await page.click(selectors.login.continueButton);

    await expect(passwordInput).toBeFocused();
    await expect(
      await passwordInput.getAttribute('aria-label') || await passwordInput.getAttribute('aria-labelledby')
    ).not.toBeNull();
  });
});
