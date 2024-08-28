# Battleship

Play the [Demo App](https://battleship.dco.dev).

This is the classic game of battleship.  It is a full-stack web application writtin in TypeScript. It follows object-oriented design patterns and principals. It was inspired by [this design](https://www.cs.nmsu.edu/~rth/cs/cs187/f97/battleshipdesign.html) and [SOLID Principles](https://en.wikipedia.org/wiki/SOLID).  The AI behavior is inspired by [this article](https://www.datagenetics.com/blog/december32011/) which contains some techniques for random placements and guessing.

This project includes the following tech:

- TypeScript
- Node.js with [Koa](https://koajs.com/) for route handling via a web server
- React single-page application from [Create React App](https://create-react-app.dev/)
- Prettier for linting with [altheajs-prettier-config](https://www.npmjs.com/package/altheajs-prettier-config)

## Types

This project also serves as a host for the `battleship-types` package hosted on [npmjs.org](https://www.npmjs.com/package/battleship-types), which includes type definitions of a typical game of Battleship, and is used throughout this project. It serves the purpose of having a single, shared set of types that can be used across both server and client applications, reducing duplication of definitions in both frontend and backend, and easing the maintainability of changes to the schema over time.

Inherently, the `battleship-types` package code is located under the `./types` directory.

## How To Run

The project must be compiled before running, and the dist directory is not checked into git. To run the project locally, use the following command:

### Install Dependencies

```bash
# server
cd ./server && npm i
# or
cd ./server && yarn install

# client
cd ./client && npm i
# or
cd ./client && yarn install
```

### Build in Development Mode

```bash
# server
cd ./server
npm run dev

# client
cd ./client
yarn start
```

### Build in Production Mode

```bash
# server
cd ./server
npm build

# client
cd ./client
yarn build
```

This will compile the TypeScript into JavaScript into a `dist/` directory, and it will run the code with `nodemon`.

### Ways To Play

- Player vs Computer
- Player vs Player
- Computer vs Computer - AI game siumlation

<p align="center">
 <img src="https://visitor-badge.glitch.me/badge?page_id=drewcook.ts-battleship" alt="visitor count"/>
</p>
