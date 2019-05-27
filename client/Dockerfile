FROM node:10.9.0

RUN npm install -g yarn

WORKDIR /app/client

COPY ./package.json ./yarn.lock ./

RUN yarn install --production

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
