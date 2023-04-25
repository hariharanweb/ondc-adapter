import fetch from 'node-fetch';
import LoggingService from './LoggingService.js';

const logger = LoggingService.getLogger('ApiCaller');

export default class ApiCaller {
  static makeHttpRequest(input) {
    return new Promise((resolve, reject) => {
      fetch(input.url, {
        method: input.httpMethod,
      })
        .then((response) => response.text())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          // handle errors here
          logger.error(error);
          reject(error);
        });
    });
  }
}
