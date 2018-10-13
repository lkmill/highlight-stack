'use strict'

// modules > 3rd party
const chalk = require('chalk')

// constants
const CWD = process.cwd() + '/'
const NODE_MODULES = 'node_modules/'
const INTERNAL = [
  '(internal/',
  '(events.js',
  '(_stream',
]
const REGEX = new RegExp(`${CWD}([^:]+):(\\d+):(\\d+)`)
const REGEX_NODE_MODULES = /((?:@[^/]*\/)?[^/]*)([^:]*)/

/*
 * Highlights a stack trace.
 *
 * {String} - String
 *
 * @returns A colored string of the stack trace
 */
module.exports = function highlightStack (stack, { keepCWD, html } = {}) {
  return stack && stack
    .split('\n')
    .map(line => {
      if (INTERNAL.some(str => line.includes(str))) {
        return chalk.grey(line)
      }

      return line.replace(REGEX, (_, path, line, column) => {
        if (path.includes(NODE_MODULES)) {
          const [ , module, file ] = path.slice(NODE_MODULES.length).match(REGEX_NODE_MODULES)

          if (html) {
            return `${keepCWD ? CWD + NODE_MODULES : ''}${path.slice(module).bold()}${file}:${line}:${column}`
          }

          return `${chalk.grey(keepCWD ? CWD + NODE_MODULES : '')}${chalk.blue(module)}${chalk.grey(file)}:${chalk.grey.bold(line)}:${chalk.grey(column)}`
        }

        if (html) {
          return `${keepCWD ? CWD : ''}${path.bold()}:${line}:${column}`
        }

        return `${chalk.grey(keepCWD ? CWD : '')}${chalk.yellow(path)}:${chalk.yellow.bold(line)}:${chalk.yellow(column)}`
      })
    }).join('\n')
}
