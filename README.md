# angular-lib

Multi-package repository for [Angular](https://angular.io/) library packages. So far, there is only one package.

The main app `angular-lib-app` is a demo app for contained Angular library packages.

## Package @marco-eckstein/angular-lib-common

[![npm version](https://badge.fury.io/js/%40marco-eckstein%2Fangular-lib-common.svg)](https://badge.fury.io/js/%40marco-eckstein%2Fangular-lib-common) Angular library for common tasks

## Development

Run `npm start` to run and open the demo app.

Run `npm run build-lib` to test and build the libraries.
Since there seems to be a bug in `ng build`, the output may be broken sometimes.
Unfortunately, you will only notice when you try to build the main app.

Run `npm run build-app` to test and build the demo app.

Run `npm run build-all` to test and build everything. It will also apply linting and end-to-end testing.
Due to the aforementioned bug, you may have to run this multiple times (typically twice) until it succeeds.
