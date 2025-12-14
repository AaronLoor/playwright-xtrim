import { test } from "../fixture/xtrim.fixture";

test.describe("Pago Servicio XTRIM", () => {

    test("Validar acceso a la landing en la sección “Pagar Servicio”", 
        async ({ inicioPage, pagoServicioPage }) => {

        await test.step("Dado que el usuario accede a la página de inicio de XTRIM", async () => {
            await inicioPage.navegarASitioInicio();
        });

        await test.step('Cuando navega hacía "Pagar Servicio"', async () => {
            await inicioPage.irAPagarServicio();
        });

        await test.step("Entonces debería ser redirigido a la sección de pago", async () => {
            await pagoServicioPage.validarPaginaCargada();
        });
    });
});