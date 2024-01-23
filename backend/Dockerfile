
# Antes de criar a imagem, instalar o ts node
# npm install ts-node-dev --save-dev
FROM node:latest


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .



EXPOSE 3000


CMD ["npm", "start"]
