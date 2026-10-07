// validator.js - VERSIÓN 1 (sin control)
// Representa el Content Validator del caso: revisa la configuración
// antes de enviarla al intérprete, pero de forma incompleta.

var schema = require('../config/config.schema.json');

// Valida una configuración candidata.
// DEFECTO SEMBRADO: el ciclo recorre solo los cuatro primeros campos
// (error lógico equivalente al del validador del incidente).
// Tampoco revisa tipos de dato ni propiedades adicionales.
function validateConfig(config) {
  var errores = [];
  var campos = Object.keys(schema.properties);
  if (config == null) {
    errores.push('La configuración está vacía');
    return { valido: false, errores: errores };
  }
  for (var i = 0; i < campos.length - 1; i++) {
    if (config[campos[i]] == undefined) {
      errores.push('Falta el campo ' + campos[i]);
    }
  }
  return { valido: errores.length == 0, errores: errores };
}

// DEFECTO SEMBRADO: copia de la misma lógica para el proceso de publicación
// (código duplicado que debe mantenerse en dos lugares).
function validateForPublish(config) {
  var errores = [];
  var campos = Object.keys(schema.properties);
  if (config == null) {
    errores.push('La configuración está vacía');
    return { valido: false, errores: errores };
  }
  for (var i = 0; i < campos.length - 1; i++) {
    if (config[campos[i]] == undefined) {
      errores.push('Falta el campo ' + campos[i]);
    }
  }
  return { valido: errores.length == 0, errores: errores };
}

module.exports = { validateConfig, validateForPublish };
