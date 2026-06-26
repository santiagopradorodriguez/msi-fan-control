# Guía de Contribución

Gracias por su interés en contribuir a **MSI Fan Control**. Su participación ayuda a mejorar la estabilidad y las características de esta herramienta en entornos Linux.

## ¿Cómo puedo contribuir?

### 1. Reportando Bugs
En caso de identificar un error, por favor abra un *Issue* en el repositorio. Asegúrese de incluir:
- Modelo específico del portátil MSI.
- Distribución de Linux y versión del kernel.
- Pasos técnicos detallados para reproducir el fallo.

### 2. Sugiriendo Funcionalidades
Las sugerencias de nuevas características son bienvenidas. Puede abrir un *Issue* con la etiqueta `enhancement` para discutir mejoras en la arquitectura del backend o en la interfaz.

### 3. Contribuyendo con Código
Para aportar código (Python, HTML/JS/CSS o Bash), siga estos pasos:

1. **Haga un Fork** del repositorio.
2. **Clone** su fork localmente: `git clone https://github.com/TU_USUARIO/msi-fan-control.git`
3. **Cree una rama** para la funcionalidad o corrección:
   - `git checkout -b feature/nueva-funcionalidad`
   - `git checkout -b bugfix/nombre-del-bug`
4. **Implemente los cambios** y verifique la correcta ejecución local mediante `start.sh`.
5. **Haga Commit** de los cambios utilizando mensajes descriptivos y directos.
6. **Suba los cambios** a su fork: `git push origin nombre-de-la-rama`
7. **Abra un Pull Request** (PR) en el repositorio principal.

## Estilo de Código
- **Backend (Python)**: Es obligatorio seguir las convenciones de PEP 8.
- **Frontend**: Se debe mantener la coherencia con el diseño existente (Dark Mode, Glassmorphism).
