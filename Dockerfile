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

#copy package.json & package-lock.json
COPY package*.json ./
# copy dist code
COPY --from=build-stage /app/dist/ /usr/src/app/dist/
# copy prisma schema
COPY --from=build-stage /app/prisma/ /usr/src/app/prisma/
# copy .env.prod
COPY --from=build-stage /app/.env.prod /usr/src/app/.env

ENV NODE_ENV=production

RUN npm ci

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
