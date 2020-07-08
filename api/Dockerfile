FROM node:10-alpine

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm"]

CMD ["run", "start"]