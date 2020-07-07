FROM node:10-alpine

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

COPY ./myprojectdomain.dev.crt /usr/local/share/ca-certificates/myprojectdomain.dev.crt

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm"]

CMD ["run", "start"]
