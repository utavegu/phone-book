FROM node:20.9.0-alpine3.18

WORKDIR /client

COPY package*.json tsconfig.json nuxt.config.ts ./

COPY server/ ./server

RUN npm i

COPY src/ ./src

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "preview" ]