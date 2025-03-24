#!/bin/bash

# Instala las dependencias
echo "Instalando dependencias..."
npm install || { echo "Error en npm install"; exit 1; }

# Inicia la aplicación
echo "Iniciando la aplicación..."
npm start || { echo "Error al iniciar la aplicación"; exit 1; }
