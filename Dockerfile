# Usa una imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar todo el código del backend al contenedor
COPY . .

# Exponer el puerto en el que corre el servidor
EXPOSE 3000

# Comando para ejecutar el servidor
CMD ["node", "server.js"]
