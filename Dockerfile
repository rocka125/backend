# Usa una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto para la aplicación
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
