# MSI Fan Control para Linux

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Python](https://img.shields.io/badge/Python-3.8%2B-green.svg)
![Flask](https://img.shields.io/badge/Framework-Flask-black.svg)
![Platform](https://img.shields.io/badge/Platform-Linux-orange.svg)

**MSI Fan Control** es una aplicación orientada al control de la velocidad de los ventiladores en portátiles MSI bajo sistemas operativos Linux.

La arquitectura se compone de un backend en Python (Flask), un cliente nativo en PyQt5 y una interfaz de usuario basada en Glassmorphism y Dark Mode. Además, implementa el **Modo Bóveda (Vault Mode)** para gestionar de forma controlada la escritura en el *Embedded Controller* (EC).

## Características Principales

- **Interfaz de Usuario**: Diseño técnico con temática oscura y elementos Glassmorphism.
- **Backend Robusto**: Construido con Python y Flask, operando sobre el puerto `5000`.
- **Integración de Escritorio**: Ejecución como ventana nativa mediante PyQt5 (`native_window.py`).
- **Máxima Seguridad (Modo Bóveda)**: Escritura controlada del EC mediante `isw_safe_wrapper.sh`. El soporte de escritura se activa únicamente durante la aplicación de los cambios, manteniendo la memoria bloqueada la mayor parte del tiempo operativo.

## Arquitectura

- **`app.py`**: Servidor Flask que expone la API para el control del hardware.
- **Frontend**: HTML, CSS y JavaScript para la gestión de la interfaz.
- **`isw_safe_wrapper.sh`**: Script de bash encargado de la gestión de permisos del módulo `ec_sys`.
- **`start.sh` / `native_window.py`**: Proceso inicial que levanta el servidor Flask y la interfaz PyQt5.

## Requisitos Previos

- Sistema Operativo: **Linux**
- **Python 3.8+**
- Módulo del kernel `ec_sys` disponible (presente en la mayoría de kernels modernos).
- Dependencias del sistema (ej. en Debian/Ubuntu):
  ```bash
  sudo apt install python3-pyqt5 python3-pip
  ```

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu_usuario/msi-fan-control.git
   cd msi-fan-control
   ```

2. Instala los requerimientos de Python (se recomienda usar un entorno virtual):
   ```bash
   pip install flask pyqt5 PyQtWebEngine
   ```

3. Asigna permisos de ejecución a los scripts:
   ```bash
   chmod +x start.sh isw_safe_wrapper.sh
   ```

## Uso

Para iniciar la aplicación, ejecuta el script de arranque:

```bash
./start.sh
```

El script `start.sh` iniciará el servidor Flask y la ventana de la aplicación.
*(Nota: Al aplicar cambios, el sistema solicitará credenciales de administrador para ejecutar el wrapper, requisito indispensable para la escritura en el EC).*

## Seguridad

Consulte el documento de [Seguridad (SECURITY.md)](SECURITY.md) para detalles técnicos sobre el funcionamiento del **Modo Bóveda** y cómo mitiga los riesgos asociados a la habilitación de `write_support=1` en el módulo `ec_sys`.

## Contribuciones

Las contribuciones son bienvenidas. Para sugerencias y reporte de errores, consulte la [Guía de Contribución (CONTRIBUTING.md)](CONTRIBUTING.md).

## Licencia

Este proyecto está distribuido bajo la licencia MIT.
