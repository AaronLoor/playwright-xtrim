import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { FormularioContactoModel } from '../models/formulario-contacto.model';

export function leerUsuariosDesdeCSV(): FormularioContactoModel[] {
    const csvPath = path.resolve(__dirname, '../data/users.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');

    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    });

    return records as FormularioContactoModel[];
}
