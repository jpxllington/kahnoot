# KAHNOOT

## Purpose of the App

KAHNOOT Is our LAP 3 Group Project for appreciation-appreciation-society. It is a trivia quiz game that supports singleplayer and multiplayer options.

- Users can create a lobby with configuraiton for a category, difficulty, and number of questions to answer.
- Users can join a created lobby
- Host will then start the quiz game for everyone in the lobby
- Players will answer the same set of questions at the same time, with a timer ticking down until the next question
- When the quiz ends players are taken to a results page where they see the lobby scores along with their own answers / the correct answers to see what they got right/wrong.

## Technologies

- HTML, CSS, JS
- Client & Socket Server
  - webpack, babel, file-loader, style-loader
  - react, react-router
  - react-redux, redux-thunk
  - axios
  - he (to decode html entities)
  - socket&#46;io
- Database Server
  - Express
  - Docker
  - PostgreSQL
- Testing
  - Jest
  - supertest
  - react-testing-library

The [client](https://kahnoot.netlify.app/) is deployed on Netlify, and the [socket server](https://kahnoot-socket-server.herokuapp.com/) and [database server](https://kahnoot-database.herokuapp.com/) are deployed on Heroku.

## Installation and Usage

### Prerequisites

- NodeJS
- npm
- Docker

### Installation

- Clone or download the repo
- Run `npm install` within `/client`, `/server/api`, and `/socket` to install packages

### Usage

- Client
  - `npm run dev` starts a locally-hosted dev-build on localhost:8080
  - `npm run dev2` starts a build on localhost:5678, if you want two instances of the client to test multiplayer
  - `npm run build` creates a local build
  - `npm test` runs the testing suite
  - `npm run coverage` provides a coverage report
- Database Server
  - run `startDev.sh` to build the dev environment which runs the server on localhost:3000
  - run `startTest.sh` to build the test environment and carries out tests
    - Don't run dev and test environments at the same time
  - run `stop.sh` to stop the current environment
  - run `teardown.sh` to completely tear down the environment
- Socket Server
  - `npm run dev` starts a locally-hosted dev-server for the socket on port 1234
  - `npm start` starts the server on port 1234

## Wins

- Achieved a functional and robust build for single and online multiplayer
- Ironed out bugs, managed to overcome the challenges below
- Mob-programming sessions helped get everything sorted
- Decoding html entities/special characters present in question/answer data pulled from API
- Had no major issues with database
- All players are given the same set of questions via the websocket, instead of multiple API calls being made
- Successful disconnects when players leave the lobby/quiz pages
- Prevented access to lobby and quiz pages if user isn't in a game room
- Got a functional leaderboard with category/difficulty filters pretty quickly

## Challenges

- websockets were tricky to figure out, lots of random bugs/crashes/etc
- lots of little weird GitHub merge conflicts, managed to sort them all
- GitHub at one point created multiple copies of a folder with different cases on name and split files across them somehow
- Had issues with correctly retrieving updated values from state variables, resolved by using redux store instead

## Bugs

- [] Users can currently join an active game, and get placed in a lobby waiting for host to start game
- [x] Users disconnecting would delete the whole room each time, even if players were still in lobby
- [x] Users refreshing on homepage would crash the server as it was trying to delete a non-existant user
- [x] Users joining/leaving the room wouldn't update for players already in the room, only the most recently added player got the full list
- [x] Quiz was skipping the first question in the set of questions

## Future Features

- Lock users out of being able to join an active game
- Display room name and quiz category, difficulty, number of questions in the lobby to all players
- Implement max players in lobby

## Licence

- [MIT Licence](https://opensource.org/licenses/mit-license.php)
