import { Page } from '@playwright/test';
import { selectors } from '@utils/selectors';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
    if (await this.page.isVisible(selectors.home.acceptCookiesButton)) {
      await this.page.click(selectors.home.acceptCookiesButton);
    }

    await this.page.click(selectors.home.loginButton);
    await this.page.click(selectors.home.hudlLoginItem);
  }

  async login(email: string, password: string) {
    await this.page.fill(selectors.login.emailInput, email);
    await this.page.click(selectors.login.continueButton);
    await this.page.fill(selectors.login.passwordInput, password);
    await this.page.click(selectors.login.loginButton);
  }

  async getPasswordInputErrorMessage() {
    return this.page.textContent(selectors.login.passwordInputError);
  }

  async getEmailInputErrorMessage() {
    return this.page.textContent(selectors.login.emailInputError);
  }

  async getLockedOutMessage() {
    return "";
    //return this.page.textContent(selectors.login.lockedOutMessage);
  }

  async getRateLimitMessage() {
    return "";
    //return this.page.textContent(selectors.login.rateLimitMessage);
  }

  async clickForgotPassword() {
    await this.page.click(selectors.login.forgotPasswordLink);
  }
}
