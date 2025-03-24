# Usa una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que se ejecutará el backend
EXPOSE 3000

# Comando para ejecutar el servidor
CMD ["npm", "start"]
