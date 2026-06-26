# Guía de Contribución

¡Gracias por tu interés en contribuir a **MSI Fan Control**! Tu ayuda es fundamental para mejorar esta herramienta para la comunidad de Linux.

## ¿Cómo puedo contribuir?

### 1. Reportando Bugs
Si encuentras un error, por favor abre un *Issue* en el repositorio. Asegúrate de incluir:
- Tu modelo de portátil MSI.
- Tu distribución de Linux y versión del kernel.
- Pasos detallados para reproducir el problema.

### 2. Sugiriendo Funcionalidades
Nos encanta escuchar nuevas ideas, especialmente mejoras para la interfaz (glassmorphism) o optimizaciones del backend (Flask). Abre un *Issue* con la etiqueta `enhancement`.

### 3. Contribuyendo con Código
Si deseas aportar código (mejoras en Python, HTML/JS/CSS o Bash), sigue estos pasos:

1. **Haz un Fork** del repositorio.
2. **Clona** tu fork localmente: `git clone https://github.com/TU_USUARIO/msi-fan-control.git`
3. **Crea una rama** para tu funcionalidad o corrección:
   - `git checkout -b feature/nueva-funcionalidad`
   - `git checkout -b bugfix/nombre-del-bug`
4. **Haz tus cambios** y asegúrate de probarlos localmente ejecutando `start.sh`.
5. **Haz Commit** de tus cambios usando mensajes claros y descriptivos.
6. **Sube los cambios** a tu fork: `git push origin nombre-de-la-rama`
7. **Abre un Pull Request** (PR) en nuestro repositorio original.

## Estilo de Código
- **Backend (Python)**: Seguimos las convenciones de PEP 8.
- **Frontend**: Mantenemos un diseño limpio con modo oscuro (Dark Mode) y estilo Glassmorphism. Intenta mantener la consistencia en el diseño UI/UX.

¡Esperamos con entusiasmo tus aportes!
