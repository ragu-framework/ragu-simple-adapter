<p align="center" style="color: #343a40">
  <p align="center" >
    <img src="repository-assets/banner.png" alt="Ragu" align="center" style="max-width: 100%">
  </p>
  <h1 align="center">Ragu Simple Adapter</h1>
</p>

![Testing](https://github.com/ragu-framework/ragu-simple-adapter/workflows/Testing/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![npm version](https://badge.fury.io/js/ragu-simple-adapter.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

A simple adapter for [Ragu Server - A micro-frontend framework](https://ragu-framework.github.io).

## Installation

```shell script
yarn install ragu-cli
yarn install ragu-simple-adapter
```

## Exposing a Component

Create a file that renders your component:

```javascript
// my-mfe.js
module.exports = () => ({
  html: 'Hello, World'
})
```

After, start the ragu server specifying your adapter:

```shell script
yarn ragu-cli dev --file my-mfe.js --adapter simple
```

Open your browser at http://localhost:3100/preview to check your micro-frontend live!

That's all!


## Build to production

```shell script
yarn ragu-cli static --file my-mfe.js --baseurl https://mycdnhost/mymfe --output production --adapter simple
```

It will create a directory called `production` with a file called `index.json`.

### Using your component

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/ragu-dom@latest/ragu-dom.js" crossorigin="anonymous"></script>
  <script>RaguDOM.registerRaguComponent();</script>
</head>

<body>
  <ragu-framework src="https://mycdnhost/mymfe/index.json"></ragu-framework>
</body>
```

Check The docs for More: https://ragu-framework.github.io/#!/ragu-simple-adapter
