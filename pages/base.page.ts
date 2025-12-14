import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navegarASitioInicio(path: string = '/') {
        await this.page.goto(path);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async click(selector: string) {
        await this.page.click(selector);
    }

    async fill(selector: string, text: string) {
        await this.page.fill(selector, text);
    }
}
