# Highlight Stack

A module to make it easier for humans to read logged stack traces in node.

This module will remove the current working directory from all paths, highlight
local file paths and node\_modules' names and fade all lines referring to node
internals.

## Installation

```
$ npm install highlight-stack
```

## Usage

Builds both CJS and ESM versions.

```js
import highlightStack from 'highlight-stack')
// or
const highlightStack = require('highlight-stack')
```

General

```js
try {
  doDodgyStuff()
} catch (err) {
  console.error(highlightStack(err.stack))
}
```

To make uncaught exceptions unhandled rejections easier to read:

```js
process.on('uncaughtException', (err) => {
  console.error(chalk.red('UNCAUGHT EXCEPTION'))

  if (err.stack) {
    console.error(highlightStack(err.stack))
  } else {
    console.error(err)
  }

  process.exit(1)
})

process.on('unhandledRejection', (err) => {
  console.error(chalk.red('UNHANDLED REJECTION'))

  if (err.stack) {
    console.error(highlightStack(err.stack))
  } else {
    console.error(err)
  }

  process.exit(1)
})
```
