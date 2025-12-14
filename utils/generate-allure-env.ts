import fs from 'fs';
import path from 'path';
import os from 'os';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../env/.env') });

const allureResultsDir = path.join(process.cwd(), 'allure-results');
const envFile = path.join(allureResultsDir, 'environment.properties');

if (!fs.existsSync(allureResultsDir)) {
    fs.mkdirSync(allureResultsDir, { recursive: true });
}

const envContent = `BASE_URL=${process.env.BASE_URL}
OS=${os.platform()} ${os.release()}
Node_Version=${process.version}
Browser=Chromium / Firefox (Playwright)
User=Automated Tester
`;

fs.writeFileSync(envFile, envContent);