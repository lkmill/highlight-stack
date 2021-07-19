// modules > 3rd party
import chalk from 'chalk'

// constants
const CWD = process.cwd() + '/'
const NODE_MODULES = 'node_modules/'
const INTERNAL = ['(_stream', '(events.js', '(internal/', '(vm.js']
const REGEX = new RegExp(`${CWD}([^:]+):(\\d+):(\\d+)`)
const REGEX_NODE_MODULES = /((?:@[^/]*\/)?[^/]*)([^:]*)/

/**
 * Highlights a stack trace.
 *
 * @param {string} stack - the stack to highlight files in
 * @param {{ keepCWD?: boolean, html?: boolean }} [options]
 *
 * @returns {string} A colored string of the stack trace
 */
export default function highlightStack(stack, { keepCWD, html } = {}) {
  return (
    stack &&
    stack
      .split('\n')
      .map((line) => {
        if (INTERNAL.some((str) => line.includes(str))) {
          return chalk.grey(line)
        }

        return line.replace(REGEX, (_, path, line, column) => {
          if (path.includes(NODE_MODULES)) {
            const result = path.slice(NODE_MODULES.length).match(REGEX_NODE_MODULES)

            if (result) {
              const [, module, file] = result

              if (html) {
                return `${keepCWD ? CWD + NODE_MODULES : ''}${path
                  .slice(parseInt(module, 10))
                  .bold()}${file}:${line}:${column}`
              }

              return `${chalk.grey(keepCWD ? CWD + NODE_MODULES : '')}${chalk.blue(module)}${chalk.grey(
                file,
              )}:${chalk.grey.bold(line)}:${chalk.grey(column)}`
            }
          }

          if (html) {
            return `${keepCWD ? CWD : ''}${path.bold()}:${line}:${column}`
          }

          return `${chalk.grey(keepCWD ? CWD : '')}${chalk.yellow(path)}:${chalk.yellow.bold(line)}:${chalk.yellow(
            column,
          )}`
        })
      })
      .join('\n')
  )
}
