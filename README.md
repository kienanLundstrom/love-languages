# Love Languages
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).
This is my solo project that is a basic CRUD application designed to help you keep track of the programming languages you know. With this app your are able to store a language as well as some other useful information about the language so you can keep track throughout your career.

## Getting Started

* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `prime_app` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
CREATE TABLE "language" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (50) ,
	"comfort" INTEGER,
	"notes" VARCHAR (800),
	"user_id" INT REFERENCES "user"
	);
SELECT * FROM "language";

CREATE TABLE "link" (
	"id" SERIAL PRIMARY KEY,
	"links" VARCHAR (200),
	"lang_id" INT REFERENCES "language" ON DELETE CASCADE,
	"user_id" INT REFERENCES "user" 
	);
CREATE TABLE "project" (
	"id" SERIAL PRIMARY KEY,
	"projects" VARCHAR (300),
	"lang_id" INT REFERENCES "language"
	);
```


## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`


## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

## Built With
    React
    React-Redux
    postgreSQl
    p5
    p5-Wrapper
    Express
    Node
    Semantic-ui
    Passport
    Axios
    Sweet Alerts
    


# love-languages
