FROM node:21-alpine3.18 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .
COPY prisma ./prisma

RUN npx prisma generate dev
USER node

FROM node:21-alpine3.18 As build

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/prisma ./prisma
COPY . .


RUN npm run build

RUN npm install --only=production && npm cache clean --force

USER node

FROM node:21-alpine3.18 As production


COPY --from=build /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.env ./.env

EXPOSE 4000
CMD [ "node", "dist/src/main" ]