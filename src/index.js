import config from './config';
import request from 'request';

class RbEmailClientException {

  constructor(error) {
    return { error };
  }

}

class RbEmailClient {

  constructor(options = {}) {
    if (options === undefined || options === null || typeof options !== 'object') {
      throw new RbEmailClientException('options is a required parameter and must be an object');
    }
    const defaultOptions = Object.assign({}, config, options);
    if (defaultOptions.apiUrl === '' || defaultOptions.apiUrl === undefined ||
      defaultOptions.apiUrl === null) {
      throw new RbEmailClientException('apiUrl is a required option');
    }
    this.options = defaultOptions;
  }

  getOptions() {
    return this.options;
  }

  sendEmail(templateEmail, to, parameters = {}, from = this.getOptions().defaultFrom) {
    return new Promise((resolve, reject) => {
      if (templateEmail === '' || templateEmail === undefined ||
        templateEmail === null || typeof to !== 'string') {
        reject(
          new RbEmailClientException('templateEmail is a required parameter and must be a string'));
      }
      if (to === '' || to === undefined || to === null || typeof to !== 'string') {
        reject(new RbEmailClientException('to is a required parameter and must be a string'));
      }
      if (from === '' || from === undefined || from === null || typeof to !== 'string') {
        reject(new RbEmailClientException('from is a required parameter and must be a string'));
      }
      if (parameters === undefined || parameters === null || typeof parameters !== 'object') {
        reject(new RbEmailClientException('parameters is a required parameter'));
      }
      const body = {
        parameters: Object.assign({}, parameters, { email: from }),
        to,
      };
      request.post({
        uri: `${this.getOptions().apiUrl}/emails/${templateEmail}/send`,
        json: true,
        body,
      },
        (errors, response) => {
          if (errors) {
            reject(errors);
          } else {
            if (response.statusCode >= 400) {
              reject(errors);
            }
            resolve(response.body);
          }
        });
    });
  }

}

export default RbEmailClient;
