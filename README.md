[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](
    https://conventionalcommits.org
)

# angular-lib

Multi-package repository for [Angular](https://angular.io/) library packages. So far, there is only one package.

The main app `angular-lib-app` is a demo app for contained Angular library packages.

## Package @marco-eckstein/angular-lib-common

[![npm version](https://badge.fury.io/js/%40marco-eckstein%2Fangular-lib-common.svg)](
    https://badge.fury.io/js/%40marco-eckstein%2Fangular-lib-common
)
[![npm downloads](https://img.shields.io/npm/dt/@marco-eckstein/angular-lib-common.svg)](
    https://npm-stat.com/charts.html?package=%40marco-eckstein%2Fangular-lib-common&from=2018-11-21
)

Angular library for common tasks

### ExternalHRefModule

External links with `target="blank"` are
[potentially unsafe](https://developers.google.com/web/tools/lighthouse/audits/noopener).
After importing this module, a directive will be applied to all your links, making them
safe by applying `rel="noopener noreferrer"`.
You can configure the module with various options.
E.g., you can configure it to apply `target="blank"` to all external links, potentially
relieving you from verbosity as in\
`<a href="http://my-url.com" target="_blank" rel="noopener noreferrer">`\
vs.\
`<a href="http://my-url.com">`.

See the code documentation for details about usage and configuration:

- [ExternalHRefModule](
      blob/master/projects/marco-eckstein/angular-lib-common/src/lib/external-href/external-href.module.ts
  )
- [ExternalHrefDirective](
      blob/master/projects/marco-eckstein/angular-lib-common/src/lib/external-href/external-href.directive.ts
  )
- [ExternalHrefOptions](
      blob/master/projects/marco-eckstein/angular-lib-common/src/lib/external-href/external-href-options.ts
  )

## Development

Run `npm start` to run and open the demo app.

Run `npm run build-lib` to test and build the libraries.
Since there seems to be a bug in `ng build`, the output may be broken sometimes.
Unfortunately, you will only notice when you try to build the main app.

Run `npm run build-app` to test and build the demo app.

Run `npm run build-all` to test and build everything. It will also apply linting and end-to-end testing.
Due to the aforementioned bug, you may have to run this multiple times (typically twice) until it succeeds.

Run `npm run doc` to build documentation.

Run `npm run standard-version` instead of `npm version` to bump the version.
Afterwards, you have to amend the commit and set the version in the library packages `package.json` files.
