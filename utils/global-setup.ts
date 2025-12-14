import fs from 'fs/promises';
import path from 'path';

async function globalSetup() {
    const allureResultsPath = path.join(process.cwd(), 'allure-results');
    const allureReportPath = path.join(process.cwd(), 'allure-report');

    console.log(`🧹 [Global Setup] Limpiando reportes...`);
    await Promise.all([
        fs.rm(allureResultsPath, { recursive: true, force: true, maxRetries: 3, retryDelay: 500 }),
        fs.rm(allureReportPath, { recursive: true, force: true, maxRetries: 3, retryDelay: 500 }),
    ]);
    console.log('✨ Carpetas limpias.');
}

export default globalSetup;