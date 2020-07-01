FROM node:10-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm"]

CMD ["run", "start"]
