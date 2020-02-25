FROM node:12.15-alpine

EXPOSE 5000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["node","app.js"]