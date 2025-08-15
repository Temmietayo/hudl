import { Page } from '@playwright/test';
import { selectors } from '@utils/selectors';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  async isHomePageVisible() {
    await this.page.waitForSelector(selectors.dashboard.homeNav, { state: 'visible' });
    return this.page.isVisible(selectors.dashboard.homeNav);
  }
}
