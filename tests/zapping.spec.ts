import { test } from "../fixture/xtrim.fixture";

test.describe('Zapping XTRIM', () => {

   test('Validar acceso a la landing de Zapping Premium', async ({ inicioPage, zappingPage }) => {
       
       const planObjetivo = 'premium'; 

       await test.step('Dado que el usuario accede a la página de inicio de XTRIM', async () => {
           await inicioPage.navegarASitioInicio();
       });

       await test.step('Cuando navega al menú "Zapping"', async () => {
           await inicioPage.irAZapping();
       });

       await test.step('Y valida que la página de Zapping cargó', async () => {
           await zappingPage.validarPaginaCargada();
       });

       await test.step(`Y selecciona la opción "Contrátalo aquí" del plan ${planObjetivo}`, async () => {
           await zappingPage.clickContratarPlan(planObjetivo);
       });

       await test.step('Entonces deberá ser redirigido a tarjeta con Logo Zapping Xtrim Ecuabet', async () => {
           await zappingPage.validarTarjetaZappingEcuabet();
       });
   });
});