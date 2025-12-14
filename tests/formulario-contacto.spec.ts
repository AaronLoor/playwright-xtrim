import { test } from "../fixture/xtrim.fixture";
import { leerUsuariosDesdeCSV } from "../utils/csv-helper";
import { FormularioContactoModel } from "../models/formulario-contacto.model";

test.describe("Contacto XTRIM", () => {

  let usuarios: FormularioContactoModel[] = leerUsuariosDesdeCSV();

  usuarios.forEach((usuario, index) => {
    test(`Formulario de contacto desde usuario #${index + 1} - con identificación ${usuario.cedula}`,
      async ({ inicioPage, contactoPage }) => {

        await test.step("Cuando carga la página de inicio", async () => {
          await inicioPage.navegarASitioInicio();
        });

        await test.step('Y navega a "Te llamamos"', async () => {
          await inicioPage.clickTeLlamamos();
        });

        await test.step("Y valida la correcta carga del formulario", async () => {
          await contactoPage.validarPaginaCargada();
        });

        await test.step("Y realiza el llenado de datos del formulario", async () => {
          await contactoPage.llenarFormulario(usuario);
        });

        await test.step("Y da click en botón Enviar", async () => {
          await contactoPage.clickEnviar();
        });

        await test.step("Entonces debería apreciar el mensaje Gracias por contactarnos", async () => {
          await contactoPage.validarEnvioExitoso();
        });
      });
  });
});