FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

#FROM nginx:1.23.3-alpine
#
#RUN apk add nodejs npm git
#RUN rm -rf /var/cache/apk/*
#
#RUN mkdir /app
#WORKDIR /app
#
#COPY package.json /app
#RUN npm install
#
#COPY . /app
#RUN npm run build
#RUN rm -rf ./node_modules
#
#RUN rm -rf /etc/nginx/conf.d/default.conf
#COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
#
#EXPOSE 80
