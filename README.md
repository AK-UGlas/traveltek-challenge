# Traveltek coding challenge

A react app with expressjs backend api to access flight information

## Requirements

Produce an API designed to run as a web service that can output flight data from "flightData_A.xml" in a JSON format.

Then create a web-page that that can retrieve the data from the API, and process it to produce the following data points:

– How many of the flights depart in the morning (before 12 AM)?
– What percentage of the total set of flights fly into Sweden?
– What are the 10 most popular destination airports?
– What’s the average journey time between London Heathrow (LHR) and Dubai (DXB)?
– At least one other statistic that you find interesting

## Requirements

**This project requires nodejs and npm to be installed on the host machine to run**

visit [nodejs homepage](https://nodejs.org/en/) to download and install the latest version

### Installation

**Server (expressjs) and Client (reactjs) applications are treated separately. packages must be installed for both**

navigate to server folder and install required packages:
```sh
cd server
npm install
```

navigate to client and repeat the process above:

```sh
cd ../client
npm install
```

###  Starting the App

**as above, the server and client must be started separately**

#### ExpressJS server

In the server folder, on the terminal type either

```sh
npm run start
```

to start the server normally or

```sh
npm run server:dev
```

to run a nodemon instance for development/debugging which monitors for code changes and restarts the server automatically

#### ReactJS app

In the 'client' folder, type terminal command

```sh
npm start
```

This will automatically open a browser window at "http://localhost:3000"


