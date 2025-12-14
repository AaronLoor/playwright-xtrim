import { test as base } from '@playwright/test';
import { InicioPage } from '../pages/inicio.page';
import { ContactoPage } from '../pages/contacto.page';
import { PagoServicioPage } from '../pages/pago-servicio.page';
import { ZappingPage } from '../pages/zapping.page';

type XtrimFixtures = {
    inicioPage: InicioPage;
    contactoPage: ContactoPage;
    pagoServicioPage: PagoServicioPage;
    zappingPage: ZappingPage;
};

export const test = base.extend<XtrimFixtures>({
    
    inicioPage: async ({ page }, use) => {
        const inicio = new InicioPage(page);
        await inicio.ocultarModalPromocion();
        await use(inicio);
    },

    contactoPage: async ({ page }, use) => {
        await use(new ContactoPage(page));
    },

    pagoServicioPage: async ({ page }, use) => {
        await use(new PagoServicioPage(page));
    },

    zappingPage: async ({ page }, use) => {
        await use(new ZappingPage(page));
    },
});

export { expect } from '@playwright/test';