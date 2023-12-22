FROM node:20.9.0-alpine3.18

WORKDIR /server

COPY package*.json tsconfig.json ./

RUN npm i -g @nestjs/cli

RUN npm i

COPY src/ ./src

RUN npm run build

EXPOSE 5000

CMD [ "npm", "run", "start:prod" ]