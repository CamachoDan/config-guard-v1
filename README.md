# config-guard — Versión 1

## Descripción

Simulador desarrollado en Node.js para representar el mecanismo del fallo de configuración del incidente de CrowdStrike Falcon de julio de 2024. No reproduce el funcionamiento interno de Falcon.

Esta versión contiene defectos intencionales: validación incompleta, integración que entrega cuatro de los cinco valores esperados y ausencia de controles de recuperación.

## Requisitos y ejecución

Se necesita Node.js y npm. Desde la carpeta del proyecto, ejecutar:

    npm install
    npm run demo
    npm test

Para revisar el código y las dependencias:

    npx eslint src
    npm audit

## Resultados esperados

- La demostración se detiene con un `TypeError` al procesar un criterio específico en el quinto campo.
- Solo se aprueba REF-01; los seis casos CP-01 a CP-06 fallan.
- Los errores permiten comparar esta línea base con la versión corregida.

## Análisis de calidad

Se utilizaron ESLint, Jest, SonarQube Cloud, SonarQube for IDE y npm audit, junto con revisión manual.

Versión corregida: [config-guard-v2](https://github.com/CamachoDan/config-guard-v2).
