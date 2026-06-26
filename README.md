# ❄️ MSI Fan Control para Linux

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Python](https://img.shields.io/badge/Python-3.8%2B-green.svg)
![Flask](https://img.shields.io/badge/Framework-Flask-black.svg)
![Platform](https://img.shields.io/badge/Platform-Linux-orange.svg)

**MSI Fan Control** es una aplicación moderna, segura y elegante para controlar la velocidad de los ventiladores en portátiles MSI bajo sistemas operativos Linux. 

Combina un potente backend en Python (Flask), una envoltura nativa en PyQt5 y una hermosa interfaz de usuario con efectos Glassmorphism y Dark Mode premium. Además, introduce el innovador **Modo Bóveda (Vault Mode)** para garantizar la máxima seguridad en la escritura del *Embedded Controller* (EC).

## ✨ Características Principales

- 🚀 **Interfaz de Usuario Premium**: Diseño moderno con temática oscura y elementos *Glassmorphism* (cristal esmerilado).
- 🐍 **Backend Robusto**: Construido con Python y Flask, sirviendo peticiones de forma rápida y eficiente en el puerto `5000`.
- 🪟 **Integración de Escritorio**: Se ejecuta como una ventana nativa de escritorio gracias a PyQt5 (`native_window.py`).
- 🛡️ **Máxima Seguridad (Modo Bóveda)**: Escritura segura del EC mediante `isw_safe_wrapper.sh`. El soporte de escritura se activa sólo por milisegundos durante la aplicación de los cambios, manteniendo la memoria de tu hardware bloqueada y segura el 99.9% del tiempo.

## 📐 Arquitectura

- **`app.py`**: Servidor Flask que expone la API para el control de los ventiladores.
- **Frontend**: HTML, CSS, y JavaScript puro para una experiencia fluida.
- **`isw_safe_wrapper.sh`**: Script de bash encargado de la gestión segura de los permisos de `ec_sys`.
- **`start.sh` / `native_window.py`**: Launcher que inicializa el servidor Flask en segundo plano y despliega la interfaz usando PyQt5.

## 🛠️ Requisitos Previos

- Sistema Operativo: **Linux**
- **Python 3.8+**
- Módulo del kernel `ec_sys` disponible (suele estar incluido en la mayoría de kernels modernos).
- Dependencias del sistema (ej. en Debian/Ubuntu):
  ```bash
  sudo apt install python3-pyqt5 python3-pip
  ```

## 📦 Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu_usuario/msi-fan-control.git
   cd msi-fan-control
   ```

2. Instala los requerimientos de Python (se recomienda usar un entorno virtual):
   ```bash
   pip install flask pyqt5 PyQtWebEngine
   ```

3. Da permisos de ejecución a los scripts:
   ```bash
   chmod +x start.sh isw_safe_wrapper.sh
   ```

## 🚀 Uso

Para arrancar la aplicación, simplemente ejecuta el launcher:

```bash
./start.sh
```

El script `start.sh` se encargará de levantar el servidor Flask internamente y lanzará la ventana de la aplicación.
*(Nota: Dependiendo de la configuración de tu sistema, al aplicar cambios puede que se solicite contraseña de administrador para el script wrapper, necesario para escribir en el EC).*

## 🔒 Seguridad

Por favor, lee nuestro documento de [Seguridad (SECURITY.md)](SECURITY.md) para entender a fondo cómo el **Modo Bóveda** protege tu ordenador evitando los riesgos tradicionales de habilitar `write_support=1` en el módulo `ec_sys`.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar el código, la interfaz o la compatibilidad, consulta nuestra [Guía de Contribución (CONTRIBUTING.md)](CONTRIBUTING.md).

## 📄 Licencia

Este proyecto está distribuido bajo la licencia MIT. Eres libre de utilizarlo y modificarlo.
