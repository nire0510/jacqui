import * as shell from 'shelljs';
import logger from '../util/logger';

export function execute(command: string, asJson: boolean): Promise<any[]> {
  return new Promise((resolve, reject) => {
    try {
      const output = shell.exec(command);

      return resolve(output && asJson ? JSON.parse(output) : output);
    }
    catch (error) {
      logger.error(error);

      return reject(error);
    }
  });
}
