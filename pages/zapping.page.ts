import { BasePage } from './base.page';
import { Page, Locator, expect } from '@playwright/test';

export class ZappingPage extends BasePage {

    private readonly logoEcuabet: Locator;

    constructor(page: Page) {
        super(page);
        this.logoEcuabet = page.getByAltText('Logo Zapping Xtrim Ecuabet');
    }

    async validarPaginaCargada() {
        await expect(this.page).toHaveURL(/.*zapping/);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickContratarPlan(tipoPlan: string) {
        const tarjetaPlan = this.page.locator('.card-rectangulo').filter({ has: this.page.locator(`img[src*="${tipoPlan.toLowerCase()}"]`) }).first();
        await expect(tarjetaPlan).toBeVisible();
        const botonContratar = tarjetaPlan.getByRole('link', { name: /Contratalo Aquí/i });
        await botonContratar.scrollIntoViewIfNeeded();
        await botonContratar.click();
    }

    async validarTarjetaZappingEcuabet() {
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(/.*zappingsva/);
        await expect(this.logoEcuabet).toBeVisible();
    }
}
