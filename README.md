# Highlight Stack

A module to make it easier for humans to read logged stack traces in node.

This module will remove the current working directory from all paths, highlight
local file paths and node\_modules' names and fade all lines referring to node
internals.

## Installation

```
$ npm install @bmp/highlight-stack
```

## Usage

General

```
try {
  doDodgyStuff()
} catch (e) {
  console.error( `[${e.name}] ${e.message}`)

  if (error.stack) {
    console.error(highlightStack(e.stack.slice(e.stack.indexOf('\n') + 1)).trim())
  }
}
```

To make uncaught exceptions easier to read:

```
const hightlightStack = require('@bmp/highlight-stack')
process.on('uncaughtException', (err) => {
  console.error(chalk.red('UNCAUGHT EXCEPTION'))

  if (err.stack) {
    console.error(highlightStack(err.stack))
  } else {
    console.error(err)
  }

  process.exit(1)
})
```

