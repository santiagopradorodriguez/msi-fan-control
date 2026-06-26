# Política de Seguridad y Modo Bóveda (Vault Mode)

En **MSI Fan Control**, la seguridad del hardware es una prioridad crítica. La manipulación de los ventiladores y la memoria del Embedded Controller (EC) en portátiles MSI requiere un manejo riguroso de privilegios.

## El Problema de `ec_sys`
Para controlar los ventiladores en Linux desde el espacio de usuario (userspace), las herramientas habitualmente requieren cargar el módulo del kernel `ec_sys` con el parámetro `write_support=1`. 
Mantener la memoria del EC abierta para escritura de forma continua representa un riesgo de seguridad y estabilidad. Cualquier proceso malicioso o defectuoso podría sobrescribir la memoria del EC, desencadenando fallos de hardware o cuelgues del sistema (kernel panics).

## Solución Implementada: Modo Bóveda (Vault Mode)
Se ha implementado el **Modo Bóveda** mediante el script `isw_safe_wrapper.sh`.

### Funcionamiento Técnico
El Modo Bóveda opera bajo el principio de privilegio mínimo temporal. En lugar de habilitar la escritura de forma constante:
1. El soporte de escritura del EC (`write_support=0`) permanece desactivado por defecto.
2. Cuando se solicita un cambio en la configuración de ventiladores, el backend invoca el wrapper.
3. El wrapper activa el soporte de escritura en el kernel (`write_support=1`).
4. Se ejecutan las instrucciones de escritura de los nuevos valores en el EC.
5. Inmediatamente después de la escritura, se restablece el bloqueo del EC devolviendo el valor a `write_support=0`.

Este enfoque minimiza la ventana de vulnerabilidad, garantizando que la memoria del hardware se mantenga protegida frente a otros procesos del sistema.

## Reporte de Vulnerabilidades
En caso de detectar una vulnerabilidad de seguridad, fallo en el código o un comportamiento anómalo en la gestión del kernel, solicitamos no abrir un *Issue* público. Por favor, utilice los canales de reporte de seguridad privados en GitHub para permitir la mitigación oportuna del problema.
