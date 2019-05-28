# NYT Most Popular Articles

## Tech & Stacks

- [Nodejs](https://nodejs.org)
- [Typescript](https://www.typescriptlang.org)
- [Yarn Package Manager](https://yarnpkg.com/en/docs/install)
- [Routing Controllers](https://www.npmjs.com/package/routing-controllers)
- [Vuejs](https://vuejs.org)
- [Nuxtjs for Vuejs SSR](https://nuxtjs.org)
- [Vuex for Vue state management](http://vuex.vuejs.org)
- [Node Version Manager (nvm)](https://github.com/creationix/nvm)

## Installing

The easiest way to install the application is through [Docker](https://www.docker.com/products/docker-desktop) and [Docker-compose](https://docs.docker.com/compose/install/). Follow the links to install Docker and Docker-compose if you haven't.

### Before you start

- Follow the instructions here on [how to get your API key on NYT developer website](https://developer.nytimes.com/get-started).
- Rename the `.env-sample` files in `client` and `server` folders. You can leave the default values as it is if you will be running on Docker. If not, feel free to change the values accordingly
- Ensure you add the API key you got by following step 1 above in `./server/.env`. The environment key is `NYT_API_KEY`.

#### Using Docker

```bash
# Run setup.sh to create docker volumes first
$ ./setup.sh

# Run this command in case you are having permission issues
$ chmod 755 setup.sh

# Ensure your Docker daemon is up and running
$ docker -v
$ docker-compose -v

# Build and start your container by running
$ docker-compose up --build
```

- Frontend can be accessed via `localhost:3000`
- Backend can be accessed via `localhost:5000`

#### Manually

Ensure Nodejs 10.9.0+ and Yarn 1.13.0+ are installed.

```bash
# Verify Nodejs and Yarn installation
# Run the following command on your terminal

$ node -v # 10.9.0
$ yarn -v # 1.13.0

# (Optional) If you have nvm installed, you can just run
$ nvm use

# Installing dependencies
# Ensure you are in the root of the project
$ yarn pre-setup
```

## Building & Starting the application

### Development environment

```bash
# To run the server and client in parallel
$ yarn start:dev

# To start only the server
$ cd server && yarn start:dev

# To start only the client
$ cd client && yarn dev
```

### Production environment

```bash
# To build both client and client in parallel
# Ensure you are in the root of the project before running this command
$ yarn build

# To build only the server
$ cd server && yarn build

# To build only the client
$ cd client && yarn build

# To start the server and client in parallel
# Ensure you are in the root of the project before running this command
$ yarn start

# To start only the server
$ cd server && yarn start

# To start only the client
$ cd client && yarn start
```

> Ensure you are in the root of the project before running those commands.

- Client can be accessed via `http://localhost:3000`

- Api can be accessed via `http://localhost:5000`

## Testing

- [Cypress](cypress.io) was used as the end-to-end testing framework on the Frontend
- Some contract tests were written on the backend to ensure that the response payload contains the right value.

```bash
# To run the client test
$ cd client
$ yarn test

# To run the server test
$ cd server
$ yarn test:e2e
```

## Stay in touch

- Author - [Temitayo Fadojutimi](https://about.me/fadojutimitemitayo)
- Twitter - [@adesege\_](https://twitter.com/adesege_)

## License

All rights reserved.
