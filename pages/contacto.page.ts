import { BasePage } from './base.page';
import { Page, Locator, expect } from '@playwright/test';
import { FormularioContactoModel } from "../models/formulario-contacto.model";


export class ContactoPage extends BasePage {
    private readonly pageTitle: Locator;
    private readonly inputNombre: Locator;
    private readonly inputCedula: Locator;
    private readonly inputTelefono: Locator;
    private readonly inputCorreo: Locator;
    private readonly checkPoliticas: Locator;
    private readonly btnEnviar: Locator;
    private readonly msgExito: Locator;
    private readonly msgErrorSpam: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.getByRole('heading', { name: 'Un asesor de ventas te contactará' });
        this.inputNombre = page.getByLabel('Nombres');
        this.inputCedula = page.getByLabel('Cédula');
        this.inputTelefono = page.getByPlaceholder('Ingresa tu número de teléfono celular');
        this.inputCorreo = page.getByLabel('Correo electrónico');
        this.checkPoliticas = page.getByRole('group', { name: 'Casillas de verificación' }).getByRole('checkbox');
        this.btnEnviar = page.getByRole('button', { name: 'Enviar' });
        this.msgExito = page.getByRole('heading', { name: /Gracias por contactarnos/i });
        this.msgErrorSpam = page.getByText(/Antispam token is invalid/i);
    }

    async validarPaginaCargada() {
        await expect(this.page).toHaveURL(/.*contactanos/);
        await expect(this.pageTitle).toBeVisible();
    }

    async llenarFormulario(data: FormularioContactoModel) {
        await this.inputNombre.fill(data.nombre);
        await this.inputCedula.fill(data.cedula);
        await this.inputTelefono.fill(data.telefono);
        await this.inputCorreo.fill(data.correo);
        await this.checkPoliticas.scrollIntoViewIfNeeded();
        await this.checkPoliticas.check({ force: true });
    }

    async clickEnviar() {
        await expect(this.btnEnviar).toBeEnabled();
        await this.btnEnviar.click();
    }

    async validarEnvioExitoso() {
        const mensajeFinal = this.msgExito.or(this.msgErrorSpam);
        await expect(mensajeFinal).toBeVisible();
    }
}
