# 🚀 Framework de Automatización de Pruebas - XTRIM

Este proyecto fue desarrollado como respuesta a un reto técnico, con el objetivo de implementar una suite de pruebas automatizadas E2E (End-to-End) sólida y escalable para el portal web de XTRIM, utilizando Playwright y TypeScript.

El framework implementa patrones de diseño avanzados y buenas prácticas de la industria para garantizar mantenibilidad, estabilidad y reportes ejecutivos de alta calidad.

## 🛠️ Stack Tecnológico y Arquitectura

- **Motor**: Playwright (Chromium, Firefox, WebKit).
- **Lenguaje**: TypeScript.
- **Patrón de Diseño**: Page Object Model (POM).
- **Inyección de Dependencias**: Uso de Test Fixtures personalizados para instanciación perezosa (Lazy Instantiation) y setup automático.
- **Data Driven Testing**: Carga de datos de prueba desde archivos CSV.
- **Reportes**: Allure Reports y reporte interno de Playwright (con historial, capturas de pantalla y videos).
- **Gestión de Entorno**: Variables configurables vía dotenv.
- **CI/CD Ready**: Configuración híbrida para ejecución local y en servidores de integración.

## 📋 Requisitos Previos

Para ejecutar este proyecto necesitas:

- Node.js (v18 o superior LTS recomendado).
- Java JDK 8+ (Requerido únicamente para generar el reporte de Allure).
- Visual Studio Code (Recomendado con extensión "Playwright Test for VSCode").

## ⚙️ Instalación y Configuración

Clonar el repositorio:

```bash
git clone https://github.com/AaronLoor/playwright-xtrim.git
cd playwright-xtrim
```

Instalar dependencias del proyecto:

```bash
npm install
```

Instalar navegadores de Playwright:

```bash
npx playwright install
```

Configurar Variables de Entorno:

1. Entra a la carpeta `env/`.
2. Busca el archivo `.env.example` (si existe renombrar de `.env.example` a `.env`) o crea un archivo `.env` nuevo.
3. Define la URL base:

```properties
BASE_URL=https://www.xtrim.com.ec
```

## 📂 Estructura del Proyecto

La arquitectura está modularizada para separar la lógica de prueba, la lógica de negocio y los datos.

```text
PLAYWRIGHT-XTRIM/
├── data/                   # Archivos de datos (CSV, JSON) para Data Driven Testing
│   └── users.csv           # Datos de usuarios para pruebas de contacto
├── env/                    # Configuración de entorno
│   └── .env                # Variables (URL, Credenciales) 
├── fixtures/               # Inyección de Dependencias
│   └── xtrim.fixture.ts    # Setup de páginas y manejo automático de Popups
├── models/                 # Interfaces TypeScript para tipado estricto de datos
├── pages/                  # Page Objects (Lógica de interacción con la UI)
│   ├── base.page.ts        # Métodos comunes y wrappers
│   ├── inicio.page.ts      # Home y Popups
│   ├── contacto.page.ts    # Formulario "Te llamamos"
│   ├── pago-servicio.page.ts # Pago servicio
│   └── zapping.page.ts     # Selección de planes
├── tests/                  # Archivos de prueba (Specs)
│   ├── formulario-contacto.spec.ts
│   ├── pago-servicio.spec.ts
│   └── zapping.spec.ts
├── utils/                  # Herramientas auxiliares (Limpieza, Allure Env, CSV)
├── playwright.config.ts    # Configuración maestra del framework
└── package.json            # Scripts de ejecución
```

## 🚀 Ejecución de Pruebas

Este proyecto utiliza scripts de NPM optimizados que realizan una limpieza automática de reportes antiguos antes de cada ejecución.

### 1. Ejecución Estándar (Modo Headless)
Ideal para integración continua o ejecución rápida.

```bash
npm run test
```

### 2. Ejecución Visual (Modo Headed)
Abre el navegador para ver la ejecución en tiempo real.

```bash
npm run test:headed
```

### 3. Ejecutar un solo archivo
Si deseas correr un spec específico:

```bash
npx playwright test tests/zapping.spec.ts --headed
```

## 📊 Generación de Reporte (Playwright)

Playwright genera reporte automáticamente el cual cuenta con los specs, el trace de ejecución, screenshots y videos.

Para abrir el reporte automáticamente en tu navegador:

```bash
npx playwright show-report
```

## 📊 Generación de Reporte (Allure)

Allure genera reportes más detallados para el negocio.

Para generar y abrir el reporte automáticamente en tu navegador:

```bash
npm run report:allure
```

(Nota: Esto compila la información, limpia historiales corruptos y levanta un servidor local).

## ✅ Escenarios Automatizados

### Formulario de Contacto ("Te llamamos"):
- Uso de Data Driven (CSV) para probar múltiples usuarios.
- Manejo de selectores semánticos (`getByRole`, `getByLabel`).
- Validación de mensajes de éxito o bloqueos de seguridad (Antispam).

### Accesos al Landing de Pagos:
- Validación de navegación segura a subdominio de pagos.
- Verificación de contenido clave en modales informativos.

### Accesos al Landing de Contratación Zapping:
- Estrategia avanzada de Filtrado Visual: Selección de planes ("Premium") basándose en el logo del plan y no solo en texto.
- Validación de redirección a landings de terceros (Ecuabet).