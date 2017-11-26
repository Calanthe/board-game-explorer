# A simple web page which helps finding popular board games.

Made to practise Server Side Rendering with React, Node, Flow, Modular CSS and CSS Grid Layout. It uses Board Games Geek's API https://boardgamegeek.com/wiki/page/BGG_XML_API2

## Installation & Execution

Install application using:

```
npm install
```

and run it with:

```
npm start
```

in order to use flow, install flow-bin cli:

```
npm install --global flow-bin
flow init
```

And test files with `// @flow` on top with:

```
flow
```

You can access the application's server directly under http://localhost:6001 or via its BrowserSync access server http://localhost:3000. BrowserSync console is available under http://localhost:3001.

## Description

The SSR part is made based on tutorial from https://www.smashingmagazine.com/2016/03/server-side-rendering-react-node-express/.

Known issues:
- Couldn't use localStorage, dunno why
- There is a console error when there is no /public/js/app.js file, but with it, I cant change anything in DOM
