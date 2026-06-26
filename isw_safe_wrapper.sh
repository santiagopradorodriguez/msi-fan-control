#!/bin/bash

ACTION=$1

if [ "$ACTION" = "read" ]; then
    # Leer no requiere write_support=1
    # Asegurarnos de que el módulo esté cargado
    if ! lsmod | grep -q ec_sys; then
        modprobe ec_sys write_support=0 2>/dev/null
    fi
    /usr/bin/python3 /home/santiago/isw/isw -r 1
elif [ "$ACTION" = "on" ] || [ "$ACTION" = "off" ]; then
    # Quitar el módulo si estaba cargado
    rmmod ec_sys 2>/dev/null
    
    # Cargar con permisos de escritura (ABRIR CERROJO)
    modprobe ec_sys write_support=1
    
    # Ejecutar el comando
    /usr/bin/python3 /home/santiago/isw/isw -b "$ACTION"
    
    # Quitar el módulo de nuevo
    rmmod ec_sys 2>/dev/null
    
    # Cargar en modo seguro solo lectura (CERRAR CERROJO)
    modprobe ec_sys write_support=0
else
    echo "Acción no válida"
    exit 1
fi
