import { BasePage } from './base.page';
import { Page, Locator, expect } from '@playwright/test';

export class PagoServicioPage extends BasePage {

    private readonly modalTitulo: Locator;

    constructor(page: Page) {
        super(page);
        this.modalTitulo = page.getByText(/Tu pago es a través de/i);
    }

    async validarPaginaCargada() {
        await expect(this.page).toHaveURL(/.*pagos\.xtrim\.com\.ec/);
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.modalTitulo).toBeVisible();
    }
}
