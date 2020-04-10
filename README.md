# Housefinder

[![Build Status](https://travis-ci.org/briandiaz/housefinder.svg?branch=master)](https://travis-ci.org/briandiaz/housefinder)

## Description

This is a basic airbnb backend clone where you can create listings, store photos to S3, alongside with JWT authentication and Swagger API documentation.

## Installation

```bash
$ npm install
```

## Run Migrations

```bash
# Prepare migrations
$ npm run migration:prepare

# Generate migrations
$ npm run migration:generate InitialMigration

# Run migrations
$ npm run migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

