// Pruebas CP-01 a CP-06 definidas en la Actividad 4 (Tabla 7).
// El mismo archivo se usa en la versión 1 y en la versión 2.
const {
  readConfigFile,
  applyConfig,
  getActiveConfig,
  getEstadisticas,
  resetState
} = require('../src/loader');

function aplicarSinFallo(config) {
  let resultado;
  expect(() => {
    resultado = applyConfig(config);
  }).not.toThrow();
  return resultado;
}

beforeEach(() => {
  resetState();
});

describe('Referencia del incidente', () => {
  test('REF-01 Configuración con comodín en el quinto campo (escenario de las pruebas de marzo)', () => {
    const config = readConfigFile('valid-config-comodin.json');
    const resultado = aplicarSinFallo(config);
    expect(resultado.activado).toBe(true);
  });
});

describe('Casos de prueba de la Actividad 4', () => {
  test('CP-01 Configuración completa con criterio específico se activa', () => {
    const config = readConfigFile('valid-config.json');
    const resultado = aplicarSinFallo(config);
    expect(resultado.activado).toBe(true);
    expect(getActiveConfig()).toEqual(config);
  });

  test('CP-02 Falta el quinto campo: se rechaza y no llega al consumidor', () => {
    const resultado = aplicarSinFallo(readConfigFile('invalid-missing.json'));
    expect(resultado.activado).toBe(false);
    expect(JSON.stringify(resultado.errores)).toContain('criterio');
    expect(getEstadisticas().activaciones).toBe(0);
  });

  test('CP-03 Tipo de dato incorrecto: se rechaza e identifica la propiedad', () => {
    const resultado = aplicarSinFallo(readConfigFile('invalid-type.json'));
    expect(resultado.activado).toBe(false);
    expect(JSON.stringify(resultado.errores)).toContain('version');
  });

  test('CP-04 Propiedad adicional: se rechaza y señala el campo extra', () => {
    const resultado = aplicarSinFallo(readConfigFile('invalid-extra.json'));
    expect(resultado.activado).toBe(false);
    expect(JSON.stringify(resultado.errores)).toContain('modoDepuracion');
  });

  test('CP-05 Inválida después de una válida: se conserva lastKnownGood', () => {
    const valida = readConfigFile('valid-config-comodin.json');
    aplicarSinFallo(valida);
    const resultado = aplicarSinFallo(readConfigFile('invalid-missing.json'));
    expect(resultado.activado).toBe(false);
    expect(getActiveConfig()).toEqual(valida);
  });

  test('CP-06 Corrección posterior: la nueva configuración válida reemplaza a la anterior', () => {
    aplicarSinFallo(readConfigFile('invalid-missing.json'));
    const corregida = readConfigFile('valid-config.json');
    const resultado = aplicarSinFallo(corregida);
    expect(resultado.activado).toBe(true);
    expect(getActiveConfig()).toEqual(corregida);
  });
});
