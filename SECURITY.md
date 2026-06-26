# Política de Seguridad y Modo Bóveda (Vault Mode)

En **MSI Fan Control**, la seguridad del hardware es nuestra principal prioridad. Sabemos que manipular los ventiladores y la memoria del Embedded Controller (EC) en portátiles MSI puede generar desconfianza, especialmente en sistemas Linux. 

## El Problema de `ec_sys`
Para controlar los ventiladores en Linux desde el espacio de usuario (userspace), muchas herramientas requieren cargar el módulo del kernel `ec_sys` con el parámetro `write_support=1`. 
Dejar la memoria del EC abierta para escritura de forma permanente es un **riesgo crítico de seguridad y estabilidad**. Cualquier proceso malicioso o con errores podría sobrescribir la memoria del EC, lo que puede resultar en fallos de hardware o cuelgues del sistema (kernel panics).

## Nuestra Solución: El Modo Bóveda (Vault Mode)
Hemos inventado el **Modo Bóveda** utilizando nuestro script `isw_safe_wrapper.sh`.

### ¿Cómo funciona?
En lugar de dejar el soporte de escritura abierto todo el tiempo, el Modo Bóveda funciona bajo un principio de privilegio mínimo en el tiempo:
1. El soporte de escritura del EC (`write_support=0`) permanece desactivado el **99.9% del tiempo**.
2. Cuando el usuario aplica un cambio en los ventiladores a través de la interfaz web, el backend llama al wrapper.
3. El wrapper activa momentáneamente el soporte de escritura (`write_support=1`).
4. Se ejecuta el comando de escritura de los nuevos valores.
5. **Inmediatamente**, en una fracción de segundo, se vuelve a bloquear el EC devolviendo el valor a `write_support=0`.

Este enfoque garantiza que el sistema esté blindado casi permanentemente, mitigando enormemente la ventana de vulnerabilidad asociada a la modificación de hardware en Linux y eliminando el riesgo de dejar la memoria expuesta a otros procesos.

## Reporte de Vulnerabilidades
Si encuentras algún fallo de seguridad, vulnerabilidad en el código o un comportamiento extraño en la gestión del kernel, por favor, no crees un *Issue* público. Contáctanos en privado o abre un reporte de seguridad privado en GitHub para que podamos mitigarlo de inmediato antes de hacerlo público.
