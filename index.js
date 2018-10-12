/*
 * Handy little util function that highlights all files in the stack trace not
 * in the node_modules/ folder.
 *
 * @module midwest/util/colorize-stack
 */

'use strict'

// modules > 3rd party
const chalk = require('chalk')

/*
 * Colorizes a stack trace.
 *
 * {String} - String
 *
 * @returns A colored string of the stack trace
 */
module.exports = function (stack, html) {
  const cwd = process.cwd() + '/'

  const regexpNodeModules = new RegExp(`node_modules/([^:]+):(\\d+):(\\d+)`)
  const regexpLocal = new RegExp(`${cwd}([^:]+):(\\d+):(\\d+)`)

  return stack && stack
    .split('\n')
    .map(line => {
      if (line.includes('(internal/')) {
        return chalk.grey(line)
      }

      if (line.includes('node_modules')) {
        return line.replace(regexpNodeModules, (_, file, line, column) => {
          if (html) {
            return `${cwd}/${file.bold}:${line}:${column}`
          }

          return `${chalk.grey('node_modules/')}${chalk.blue(file)}:${chalk.blue.bold(line)}:${chalk.blue(column)}`
        })
      }

      return line.replace(regexpLocal, (_, file, line, column) => {
        if (html) {
          return `${cwd}/${file.bold}:${line}:${column}`
        }

        return `${chalk.grey(cwd)}${chalk.yellow(file)}:${chalk.yellow.bold(line)}:${chalk.yellow(column)}`
      })
    }).join('\n')
  // eslint-disable-next-line no-useless-escape
}
