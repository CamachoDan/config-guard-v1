// demo.js - Simulación de una secuencia de despliegue de configuraciones.
const { readConfigFile, applyConfig, getActiveConfig } = require('./loader');

const secuencia = [
  'valid-config-comodin.json',
  'valid-config.json',
  'invalid-missing.json'
];

console.log('=== Simulación de despliegue - config-guard ===');
for (const archivo of secuencia) {
  console.log(`\n> Recibiendo ${archivo}`);
  const resultado = applyConfig(readConfigFile(archivo));
  if (resultado.activado) {
    console.log('  Configuración ACTIVADA');
  } else {
    console.log('  Configuración RECHAZADA:', resultado.errores);
  }
  console.log('  Configuración activa:', getActiveConfig().id);
}
console.log('\nEstado final del servicio: EN FUNCIONAMIENTO');
