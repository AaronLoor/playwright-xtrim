import { BasePage } from './base.page';
import { Page, Locator, test } from '@playwright/test';

export class InicioPage extends BasePage {

    private readonly modalOverlay: Locator;
    private readonly modalCloseBtn: Locator;
    private readonly teLlamamosLink: Locator;
    private readonly pagarServicioLink: Locator;
    private readonly zappingLink: Locator;

    constructor(page: Page) {
        super(page);
        this.modalCloseBtn = page.locator('#myModal .close');
        this.modalOverlay = page.locator('#myModal');
        this.teLlamamosLink = page.getByRole('link', { name: 'Te llamamos' });
        this.pagarServicioLink = page.getByRole('link', { name: 'Pagar Servicio' });
        this.zappingLink = page.getByRole('link', { name: 'Zapping' });
    }

    async ocultarModalPromocion() {
        await this.page.addLocatorHandler(
            this.modalOverlay,
            async () => {
                await test.step('Y cerramos el popup de Promoción detectado', async () => {
                    await this.modalCloseBtn.click();
                    await this.modalOverlay.waitFor({ state: 'hidden' });
                });
            }
        );
    }

    async clickTeLlamamos() {
        await this.teLlamamosLink.click();
    }

    async irAPagarServicio() {
        await test.step('Navegar a la sección de Pagos', async () => {
            await this.pagarServicioLink.click();
        });
    }

    async irAZapping() {
        await test.step('Navegar a la sección de Zapping', async () => {
            await this.zappingLink.click();
        });
    }

}
