FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm cache clean --force

COPY index.js ./

CMD ["npm", "run", "start"]
