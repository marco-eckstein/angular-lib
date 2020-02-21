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
      projects/marco-eckstein/angular-lib-common/src/lib/external-href/external-href.module.ts
  )
- [ExternalHrefDirective](
      projects/marco-eckstein/angular-lib-common/src/lib/external-href/external-href.directive.ts
  )
- [ExternalHrefOptions](
      projects/marco-eckstein/angular-lib-common/src/lib/external-href/external-href-options.ts
  )

## Development

### Build

Run `npm run verify` to build, lint and test everything and also build the documentation.

For finer-grained commands, see the scripts in `./package.json`.

Note that broken library build output has been observed in the past, probably due to a bug in `ng build`.
You may only notice this when you try to build the main/demo app.
Running `npm run verify` (or a finer-grained build command) multiple times (typically twice) may help.

### Run

After building, run `npm start` to run and open the demo app.

### Bump version

You have to set the next version manually in the library packages' `package.json` files.
Then, run `npm run standard-version` instead of `npm version` to bump the version.
Make sure the manually and automatically set versions match.

### Publish

Run `npm run publish-lib` to publish the libraries to npm.
