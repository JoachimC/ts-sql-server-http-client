import * as Http from 'http';
import * as Tedious from 'tedious';
import * as Sql from './sql/sql';
import * as WebClient from './web-service-client/web-service-client';

const sql_config_defaults: Tedious.ConnectionConfig = {
  server: 'BOB',
  userName: 'joachim',
  domain: 'BOB',
};

const web_service_options: Http.RequestOptions = {
  method: 'GET',
  hostname: 'jsonplaceholder.typicode.com',
  protocol: 'https:',
  path: '/posts',
};

const web_service_default_credentials: WebClient.BasicAuthenticationCredentials = {username: 'fish'};

const sql_config = Sql.ask_user_for_sql_config(sql_config_defaults);
const basic_credentials = WebClient.ask_for_basic_authentication(web_service_default_credentials);
const authentication = () => basic_credentials;

Sql.connect(sql_config)
  .then(connection => {
    console.log(`connected to server ${sql_config.server}`);

    WebClient.call_service(web_service_options, authentication);

    connection.close();
    connection.removeAllListeners();
  })
  .catch(console.error);
