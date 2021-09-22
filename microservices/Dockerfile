FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

ENV MONGO_URI="mongodb://mongodb_container:27017/"
