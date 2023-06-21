FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm cache clean --force

COPY . .

CMD ["npm", "run", "start"]
