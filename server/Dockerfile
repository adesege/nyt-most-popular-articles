FROM node:10.9.0


RUN npm install -g yarn

WORKDIR /app/server

RUN yarn -v

COPY ./package.json ./yarn.lock ./

RUN yarn install --production --quiet

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
