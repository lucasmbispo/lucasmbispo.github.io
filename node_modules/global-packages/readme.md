# global-packages

[![Build Status](https://travis-ci.org/zeit/global-packages.svg?branch=master)](https://travis-ci.org/zeit/global-packages)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![Slack Channel](http://zeit-slackin.now.sh/badge.svg)](https://zeit.chat)

List global Node packages easily.

## Usage

Simply install the package:

```bash
npm install --save global-packages
```

After that, load it:

```js
const globalPackages = require('global-packages')

let packages

try {
  packages = await globalPackages()
} catch (err) {
  console.error(err)
  return
}

console.log(packages)
```

This is how the output will look like:

```js
[
  {
    name: 'args',
    linked: true,
    path: '/usr/local/lib/node_modules/args'
  },
  {
    name: 'now',
    linked: false,
    path: '/usr/local/lib/node_modules/now'
  },
  {
    name: 'serve',
    linked: false,
    path: '/usr/local/lib/node_modules/serve'
  },
  ...
]
```

## Contribute

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Link the package to the global module directory: `npm link`
3. Transpile the source code and watch for changes: `npm start`
4. Within the module you want to test your local development instance of global-packages, just link it to the dependencies: `npm link global-packages` and load it!

## Author

Leo Lamprecht ([@notquiteleo](https://twitter.com/notquiteleo)) - [▲ZEIT](https://zeit.co)
