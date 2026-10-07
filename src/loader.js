// loader.js - VERSIÓN 1 (sin control)
// Representa la integración y el Content Interpreter del caso.

var fs = require('fs');
var path = require('path');
var schema = require('../config/config.schema.json');
var { validateConfig } = require('./validator');

// DEFECTO SEMBRADO: credencial escrita directamente en el código.
const CANAL_PASSWORD = 'canal291-admin';

var lastKnownGood = null;
var estadisticas = { activaciones: 0, rechazos: 0 };

// Lee un archivo de configuración de la carpeta config.
// DEFECTO SEMBRADO: si el JSON está mal formado, el error se ignora.
function readConfigFile(nombre) {
  var ruta = path.join(__dirname, '..', 'config', nombre);
  var contenido = fs.readFileSync(ruta, 'utf8');
  try {
    return JSON.parse(contenido);
  } catch (e) {}
}

// Integración: prepara los valores que recibe el intérprete.
// DEFECTO SEMBRADO: la plantilla declara cinco campos, pero aquí solo se
// entregan cuatro (equivalente a los 21 campos frente a 20 valores).
function obtenerValores(config) {
  return [config.id, config.version, config.tipoEvento, config.nivelRiesgo];
}

// Intérprete: recorre los campos declarados en la plantilla.
// Si un campo usa el comodín "*", no consulta su valor.
// DEFECTO SEMBRADO: no comprueba que exista el valor antes de leerlo.
function loadConfig(config) {
  var campos = Object.keys(schema.properties);
  var valores = obtenerValores(config);
  var interpretado = {};
  for (var i = 0; i < campos.length; i++) {
    if (config[campos[i]] == '*') {
      continue;
    }
    interpretado[campos[i]] = valores[i].toString().trim();
  }
  return interpretado;
}

// Aplica una configuración candidata al servicio simulado.
function applyConfig(candidata) {
  var resultado = validateConfig(candidata);
  if (resultado.valido) {
    loadConfig(candidata);
    lastKnownGood = candidata;
    estadisticas.activaciones++;
    return { activado: true, errores: [] };
  }
  estadisticas.rechazos++;
  return { activado: false, errores: resultado.errores };
}

function autenticarCanal(clave) {
  return clave === CANAL_PASSWORD;
}

function getActiveConfig() {
  return lastKnownGood;
}

function getEstadisticas() {
  return estadisticas;
}

function resetState() {
  lastKnownGood = null;
  estadisticas = { activaciones: 0, rechazos: 0 };
}

module.exports = {
  readConfigFile,
  loadConfig,
  applyConfig,
  autenticarCanal,
  getActiveConfig,
  getEstadisticas,
  resetState
};
