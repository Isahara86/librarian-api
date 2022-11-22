############### Stage 0 build stage ##################
FROM node:16.18 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build:docker

############### Stage 1 run stage ##################
FROM node:16.18

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=build-stage /app/dist/ /usr/src/app/dist/

ENV NODE_ENV=production

RUN npm ci

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
