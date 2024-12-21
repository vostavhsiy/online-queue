FROM node:22-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env .

RUN npx prisma db push
RUN npx prisma generate

RUN npm run build
EXPOSE 3000
CMD [ "node", "dist/main.js" ]
