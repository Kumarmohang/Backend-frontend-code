import { spawnSync } from 'child_process';

import Logger from './logger';

const logger = new Logger('shellUtil');

/**
 * @typedef {import('child_process').SpawnSyncReturns} SpawnSyncReturns
 */

/**
 * Run command on shell.
 *
 * @param {string} arg - Command to execute.
 * @param {string[]} args - Options for command.
 * @returns {SpawnSyncReturns<string>} - Returns nothing.
 */
export const runCommand = (arg, args) => {
  logger.debug(`Running command: ${arg} ${args.join(' ')}`);
  const cmd = spawnSync(arg, args);
  logger.debug(`Command output: ${cmd.stdout.toString()}`);
  logger.debug(`Command Error: ${cmd.stderr.toString()}`);
  return cmd;
};
