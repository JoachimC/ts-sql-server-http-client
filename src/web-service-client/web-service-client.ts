import * as Http from 'http';
import * as Https from 'https';
import * as Ask from '../ask/ask';

export class BasicAuthenticationCredentials {
  public username?: string;
  public password?: string;
}

export function ask_for_basic_authentication(template_credentials?: BasicAuthenticationCredentials): string {
  const credentials: BasicAuthenticationCredentials = {...template_credentials};

  credentials.username = Ask.for_input('Web Service Username', credentials.username);
  credentials.password = Ask.for_password('Web Service Password', credentials.password);

  const auth_string: string = new Buffer(`${credentials.username}:${credentials.password}`).toString('base64');
  return `Basic ${auth_string}`;
}

export function call_service(template_options: Http.RequestOptions, authenticate?: () => string, post_data?: string): Promise<string> {

  const run_options = {...template_options, protocol: 'https:'};

  if (authenticate) {
    run_options.auth = authenticate();
  }

  // credit to https://stackoverflow.com/a/38543075
  return new Promise((resolve, reject) => {
    const request = Https.request(run_options, response => {

      if ((!response.statusCode) || (response.statusCode < 200 || response.statusCode >= 300)) {
        return reject(new Error(`statusCode={response.statusCode}`));
      }

      const chunks: any[] = [];
      response.on('data', chunk => {
        chunks.push(chunk);
      });

      response.on('end', () => {

        try {
          const body = (Buffer.concat(chunks)).toString();
          resolve(body);
        } catch (e) {
          reject(e);
        }
      });
    });

    request.on('error', err => {
      reject(err);
    });
    if (post_data) {
      request.write(post_data);
    }

    request.end();
  });
}
