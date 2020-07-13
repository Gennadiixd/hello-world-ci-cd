FROM node:12-alpine

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm"]

CMD ["run", "start"]