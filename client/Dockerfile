FROM node:10-alpine as builder

COPY package.json package-lock.json ./
RUN npm install --only=prod&& mkdir /react-frontend && mv ./node_modules ./react-frontend

WORKDIR /react-frontend

COPY . .

EXPOSE 3000

RUN npm run build
