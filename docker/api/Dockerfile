FROM node:10-alpine

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["yarn", "run", "start"]
